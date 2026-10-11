package com.smartagri.controller;

import com.smartagri.entity.Order;
import com.smartagri.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderService orderService;


    @PostMapping
    public Order addOrder(@RequestBody Order order) {

        return orderService.saveOrder(order);
    }


    @GetMapping
    public List<Order> getOrders(
            @RequestParam(required = false) Long farmerId) {

        if (farmerId != null) {

            return orderService
                    .getOrdersByFarmerId(farmerId);
        }

        return orderService.getAllOrders();
    }


    @GetMapping("/{id}")
    public Order getOrder(
            @PathVariable Long id) {

        return orderService.getOrderById(id);
    }


    // Update status
    @PutMapping("/{id}/status")
    public Order updateOrderStatus(
            @PathVariable Long id,
            @RequestParam String status,
            @RequestParam String role) {

        return orderService.updateOrderStatus(
                id,
                status,
                role
        );
    }


    @PutMapping("/{id}")
    public Order updateOrder(
            @PathVariable Long id,
            @RequestBody Order order) {

        return orderService.updateOrder(
                id,
                order
        );
    }


    @DeleteMapping("/{id}")
    public String deleteOrder(
            @PathVariable Long id) {

        orderService.deleteOrder(id);

        return "Order Deleted Successfully";
    }
}