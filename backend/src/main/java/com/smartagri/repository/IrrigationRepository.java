package com.smartagri.repository;

import com.smartagri.entity.Irrigation;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IrrigationRepository
        extends JpaRepository<Irrigation, Long> {

    List<Irrigation> findByFarmIdOrderByIrrigationDateDesc(
            Long farmId
    );
}