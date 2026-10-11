package com.smartagri.service;

import com.smartagri.entity.Farm;

import java.util.List;

public interface FarmService {

    Farm saveFarm(Farm farm);

    List<Farm> getAllFarms();

    List<Farm> getFarmsByFarmerId(Long farmerId);

    Farm getFarmById(Long id);

    Farm updateFarm(Long id, Farm farm);

    void deleteFarm(Long id);
}