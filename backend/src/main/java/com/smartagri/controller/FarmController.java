package com.smartagri.controller;

import com.smartagri.entity.Farm;
import com.smartagri.entity.User;
import com.smartagri.repository.UserRepository;
import com.smartagri.service.FarmService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/farms")
@CrossOrigin(origins = "http://localhost:5173")
public class FarmController {

    @Autowired
    private FarmService farmService;

    @Autowired
    private UserRepository userRepository;


    // =========================================
    // ADD FARM
    // =========================================

    @PostMapping
    public Farm addFarm(
            @RequestParam Long farmerId,
            @RequestBody Farm farm) {

        User farmer =
                userRepository
                        .findById(farmerId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Farmer not found"
                                )
                        );


        farm.setFarmer(farmer);


        return farmService.saveFarm(farm);
    }


    // =========================================
    // GET FARMS
    // =========================================

    @GetMapping
    public List<Farm> getFarms(
            @RequestParam(required = false)
            Long farmerId) {

        if (farmerId != null) {

            return farmService
                    .getFarmsByFarmerId(
                            farmerId
                    );
        }


        return farmService.getAllFarms();
    }


    // =========================================
    // GET FARM BY ID
    // =========================================

    @GetMapping("/{id}")
    public Farm getFarm(
            @PathVariable Long id) {

        return farmService
                .getFarmById(id);
    }


    // =========================================
    // UPDATE FARM
    // =========================================

    @PutMapping("/{id}")
    public Farm updateFarm(
            @PathVariable Long id,
            @RequestBody Farm farm) {

        Farm existingFarm =
                farmService
                        .getFarmById(id);


        if (existingFarm == null) {

            throw new RuntimeException(
                    "Farm not found"
            );
        }


        farm.setId(id);


        // Keep original farmer

        farm.setFarmer(
                existingFarm.getFarmer()
        );


        return farmService.updateFarm(
                id,
                farm
        );
    }


    // =========================================
    // DELETE FARM
    // =========================================

    @DeleteMapping("/{id}")
    public String deleteFarm(
            @PathVariable Long id) {

        farmService.deleteFarm(id);

        return "Farm Deleted Successfully";
    }
}