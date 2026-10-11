package com.smartagri.service.impl;

import com.smartagri.entity.Farm;
import com.smartagri.entity.Irrigation;
import com.smartagri.entity.Product;

import com.smartagri.repository.FarmRepository;
import com.smartagri.repository.IrrigationRepository;
import com.smartagri.repository.ProductRepository;

import com.smartagri.service.FarmService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FarmServiceImpl implements FarmService {

    @Autowired
    private FarmRepository farmRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private IrrigationRepository irrigationRepository;


    // =========================================
    // SAVE FARM
    // =========================================

    @Override
    public Farm saveFarm(Farm farm) {
        return farmRepository.save(farm);
    }


    // =========================================
    // GET ALL FARMS
    // =========================================

    @Override
    public List<Farm> getAllFarms() {
        return farmRepository.findAll();
    }


    // =========================================
    // GET FARMER FARMS
    // =========================================

    @Override
    public List<Farm> getFarmsByFarmerId(Long farmerId) {

        return farmRepository.findByFarmerId(farmerId);
    }


    // =========================================
    // GET FARM BY ID
    // =========================================

    @Override
    public Farm getFarmById(Long id) {

        return farmRepository
                .findById(id)
                .orElse(null);
    }


    // =========================================
    // UPDATE FARM
    // =========================================

    @Override
    public Farm updateFarm(Long id, Farm farm) {

        farm.setId(id);

        return farmRepository.save(farm);
    }


    // =========================================
    // DELETE FARM
    // =========================================

    @Override
    @Transactional
    public void deleteFarm(Long id) {

        // -----------------------------------------
        // FIND FARM
        // -----------------------------------------

        Farm farm = farmRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Farm not found")
                );


        // =========================================
        // 1. HANDLE PRODUCTS
        // =========================================

        List<Product> products =
                productRepository.findByFarmId(id);

        for (Product product : products) {

            /*
             * Keep the product because old orders
             * may refer to this product.
             */

            product.setFarm(null);

            // Remove remaining stock
            product.setQuantity(0.0);

            // Product is no longer available
            product.setStatus("Farm Deleted");
        }

        /*
         * Save all product changes.
         */
        productRepository.saveAll(products);

        /*
         * IMPORTANT:
         * Force Hibernate to write the product
         * updates to the database before deleting
         * the farm.
         */
        productRepository.flush();


        // =========================================
        // 2. HANDLE IRRIGATION RECORDS
        // =========================================

        List<Irrigation> irrigations =
                irrigationRepository
                        .findByFarmIdOrderByIrrigationDateDesc(id);

        for (Irrigation irrigation : irrigations) {

            /*
             * Keep irrigation history.
             * Only remove its farm relationship.
             */

            irrigation.setFarm(null);
        }

        /*
         * Save all irrigation changes.
         */
        irrigationRepository.saveAll(irrigations);

        /*
         * IMPORTANT:
         * Force Hibernate to update irrigation
         * records before deleting the farm.
         */
        irrigationRepository.flush();


        // =========================================
        // 3. DELETE FARM
        // =========================================

        farmRepository.delete(farm);

        /*
         * Force the farm deletion now.
         */
        farmRepository.flush();
    }
}