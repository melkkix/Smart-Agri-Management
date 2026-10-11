package com.smartagri.controller;

import com.smartagri.entity.Irrigation;
import com.smartagri.service.IrrigationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/irrigations")
@CrossOrigin(origins = "http://localhost:5173")
public class IrrigationController {

    @Autowired
    private IrrigationService irrigationService;


    // =========================================
    // SAVE IRRIGATION
    // =========================================

    @PostMapping
    public Irrigation saveIrrigation(
            @RequestBody Irrigation irrigation) {

        return irrigationService
                .saveIrrigation(irrigation);
    }


    // =========================================
    // GET ALL IRRIGATIONS
    // =========================================

    @GetMapping
    public List<Irrigation> getAllIrrigations() {

        return irrigationService
                .getAllIrrigations();
    }


    // =========================================
    // GET IRRIGATIONS BY FARM
    // =========================================

    @GetMapping("/farm/{farmId}")
    public List<Irrigation> getByFarm(
            @PathVariable Long farmId) {

        return irrigationService
                .getIrrigationsByFarmId(farmId);
    }
}