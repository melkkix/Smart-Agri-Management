package com.smartagri.service;

import com.smartagri.entity.Order;

import java.util.List;

public interface OrderService {

    Order saveOrder(Order order);

    List<Order> getAllOrders();

    List<Order> getOrdersByFarmerId(Long farmerId);

    Order getOrderById(Long id);

    Order updateOrderStatus(Long id, String status, String role);

    Order updateOrder(Long id, Order order);

    void deleteOrder(Long id);
}