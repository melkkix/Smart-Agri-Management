package com.smartagri.service;

import com.smartagri.entity.Irrigation;

import java.util.List;

public interface IrrigationService {

    Irrigation saveIrrigation(Irrigation irrigation);

    List<Irrigation> getIrrigationsByFarmId(Long farmId);

    List<Irrigation> getAllIrrigations();
}