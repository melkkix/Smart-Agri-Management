package com.smartagri.service.impl;

import com.smartagri.entity.Farm;
import com.smartagri.entity.Irrigation;
import com.smartagri.repository.FarmRepository;
import com.smartagri.repository.IrrigationRepository;
import com.smartagri.service.IrrigationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class IrrigationServiceImpl implements IrrigationService {

    @Autowired
    private IrrigationRepository irrigationRepository;

    @Autowired
    private FarmRepository farmRepository;


    // =========================================
    // SAVE IRRIGATION
    // =========================================

    @Override
    public Irrigation saveIrrigation(Irrigation irrigation) {

        if (irrigation.getFarm() == null
                || irrigation.getFarm().getId() == null) {

            throw new RuntimeException("Farm is required");
        }

        Farm farm = farmRepository
                .findById(irrigation.getFarm().getId())
                .orElseThrow(() ->
                        new RuntimeException("Farm not found")
                );

        irrigation.setFarm(farm);

        if (irrigation.getIrrigationDate() == null) {

            irrigation.setIrrigationDate(
                    LocalDateTime.now()
            );
        }

        if (irrigation.getWaterAmount() == null
                || irrigation.getWaterAmount() <= 0) {

            throw new RuntimeException(
                    "Water amount must be greater than 0"
            );
        }

        return irrigationRepository.save(irrigation);
    }


    // =========================================
    // GET IRRIGATION BY FARM
    // =========================================

    @Override
    public List<Irrigation> getIrrigationsByFarmId(
            Long farmId) {

        return irrigationRepository
                .findByFarmIdOrderByIrrigationDateDesc(
                        farmId
                );
    }


    // =========================================
    // GET ALL IRRIGATIONS
    // =========================================

    @Override
    public List<Irrigation> getAllIrrigations() {

        return irrigationRepository.findAll();
    }
}