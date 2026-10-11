package com.smartagri.service.impl;

import com.smartagri.entity.Product;
import com.smartagri.repository.ProductRepository;
import com.smartagri.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl
        implements ProductService {


    @Autowired
    private ProductRepository productRepository;


    // =========================================
    // ADD PRODUCT
    // =========================================

    @Override
    public Product saveProduct(Product product) {

        return productRepository.save(product);
    }


    // =========================================
    // GET ALL PRODUCTS
    // =========================================

    @Override
    public List<Product> getAllProducts() {

        return productRepository.findAll();
    }


    // =========================================
    // GET PRODUCTS BY FARMER
    // =========================================

    @Override
    public List<Product> getProductsByFarmerId(
            Long farmerId) {

        return productRepository
                .findByFarmFarmerId(farmerId);
    }


    // =========================================
    // GET PRODUCT BY ID
    // =========================================

    @Override
    public Product getProductById(Long id) {

        return productRepository
                .findById(id)
                .orElse(null);
    }


    // =========================================
    // UPDATE PRODUCT
    // =========================================

    @Override
    public Product updateProduct(
            Long id,
            Product product) {

        product.setId(id);

        return productRepository.save(product);
    }


    // =========================================
    // DELETE PRODUCT
    // =========================================

    @Override
    public void deleteProduct(Long id) {

        productRepository.deleteById(id);
    }
}