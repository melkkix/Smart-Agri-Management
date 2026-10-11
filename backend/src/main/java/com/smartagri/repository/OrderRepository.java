package com.smartagri.repository;

import com.smartagri.entity.Order;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByProductFarmFarmerId(Long farmerId);

}