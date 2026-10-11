package com.smartagri.service.impl;

import com.smartagri.entity.Notification;
import com.smartagri.entity.Order;
import com.smartagri.entity.Product;
import com.smartagri.entity.User;
import com.smartagri.repository.NotificationRepository;
import com.smartagri.repository.OrderRepository;
import com.smartagri.repository.ProductRepository;
import com.smartagri.repository.UserRepository;
import com.smartagri.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;


    // =========================================
    // SAVE ORDER
    // =========================================

    @Override
    @Transactional
    public Order saveOrder(Order order) {

        // -----------------------------------------
        // CHECK PRODUCT
        // -----------------------------------------

        if (order.getProduct() == null ||
                order.getProduct().getId() == null) {

            throw new RuntimeException(
                    "Product is required"
            );
        }


        Product product = productRepository
                .findById(order.getProduct().getId())
                .orElse(null);


        if (product == null) {

            throw new RuntimeException(
                    "Product not found"
            );
        }


        // -----------------------------------------
        // CHECK BUYER
        // -----------------------------------------

        if (order.getBuyer() == null ||
                order.getBuyer().getId() == null) {

            throw new RuntimeException(
                    "Buyer is required"
            );
        }


        User buyer = userRepository
                .findById(order.getBuyer().getId())
                .orElse(null);


        if (buyer == null) {

            throw new RuntimeException(
                    "Buyer not found"
            );
        }


        order.setBuyer(buyer);


        // -----------------------------------------
        // CHECK ORDER QUANTITY
        // -----------------------------------------

        if (order.getQuantity() <= 0) {

            throw new RuntimeException(
                    "Order quantity must be greater than 0"
            );
        }


        // -----------------------------------------
        // CHECK STOCK
        // -----------------------------------------

        if (product.getQuantity() <= 0) {

            throw new RuntimeException(
                    "This product is sold out"
            );
        }


        if (order.getQuantity() > product.getQuantity()) {

            throw new RuntimeException(
                    "Not enough stock available. Only "
                    + product.getQuantity()
                    + " "
                    + product.getUnit()
                    + " available."
            );
        }


        // -----------------------------------------
        // CALCULATE TOTAL PRICE
        // -----------------------------------------

        double totalPrice =
                order.getQuantity()
                * product.getPrice();

        order.setTotalPrice(totalPrice);


        // -----------------------------------------
        // SET ORDER STATUS
        // -----------------------------------------

        order.setStatus("Pending");


        // -----------------------------------------
        // REDUCE PRODUCT QUANTITY
        // -----------------------------------------

        double remainingQuantity =
                product.getQuantity()
                - order.getQuantity();


        product.setQuantity(
                remainingQuantity
        );


        // -----------------------------------------
        // UPDATE PRODUCT STATUS
        // -----------------------------------------

        if (remainingQuantity <= 0) {

            product.setQuantity(0.0);

            product.setStatus("All Sold");

        } else {

            product.setStatus("Available");

        }


        // -----------------------------------------
        // SAVE PRODUCT
        // -----------------------------------------

        productRepository.save(product);


        // -----------------------------------------
        // SAVE ORDER
        // -----------------------------------------

        Order savedOrder =
                orderRepository.save(order);


        // =========================================
        // NOTIFY FARMER
        // =========================================

        if (product.getFarm() != null &&
                product.getFarm().getFarmer() != null) {

            User farmer =
                    product.getFarm().getFarmer();


            Notification notification =
                    new Notification();


            notification.setUserId(
                    farmer.getId()
            );


            notification.setMessage(
                    "New order received for "
                    + product.getProductName()
                    + " 📦"
            );


            notification.setRead(false);


            notificationRepository.save(
                    notification
            );
        }


        return savedOrder;
    }


    // =========================================
    // GET ALL ORDERS
    // =========================================

    @Override
    public List<Order> getAllOrders() {

        return orderRepository.findAll();
    }


    // =========================================
    // GET FARMER ORDERS
    // =========================================

    @Override
    public List<Order> getOrdersByFarmerId(
            Long farmerId) {

        return orderRepository
                .findByProductFarmFarmerId(
                        farmerId
                );
    }


    // =========================================
    // GET ORDER BY ID
    // =========================================

    @Override
    public Order getOrderById(Long id) {

        return orderRepository
                .findById(id)
                .orElse(null);
    }


    // =========================================
    // UPDATE ORDER STATUS
    // =========================================

    @Override
    public Order updateOrderStatus(
            Long id,
            String status,
            String role) {

        Order order =
                orderRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Order not found"
                                )
                        );


        String currentStatus =
                order.getStatus();


        // =========================================
        // FARMER
        // =========================================

        if (role.equals("Farmer")) {

            if (currentStatus.equals("Pending")
                    && status.equals("Ready")) {

                order.setStatus("Ready");


                // ---------------------------------
                // NOTIFY ADMIN
                // ---------------------------------

                List<User> admins =
                        userRepository
                                .findByRole("Admin");


                for (User admin : admins) {

                    Notification notification =
                            new Notification();


                    notification.setUserId(
                            admin.getId()
                    );


                    notification.setMessage(
                            "Order #"
                            + order.getId()
                            + " is ready for processing 📦"
                    );


                    notification.setRead(false);


                    notificationRepository.save(
                            notification
                    );
                }


            } else {

                throw new RuntimeException(
                        "Farmer can only change Pending to Ready."
                );
            }
        }


        // =========================================
        // ADMIN
        // =========================================

        else if (role.equals("Admin")) {

            // -------------------------------------
            // READY → PROCESSING
            // -------------------------------------

            if (currentStatus.equals("Ready")
                    && status.equals("Processing")) {

                order.setStatus("Processing");

            }


            // -------------------------------------
            // PROCESSING → DELIVERED
            // -------------------------------------

            else if (
                    currentStatus.equals("Processing")
                    && status.equals("Delivered")) {

                order.setStatus("Delivered");


                // ---------------------------------
                // NOTIFY BUYER
                // ---------------------------------

                if (order.getBuyer() != null) {

                    Notification notification =
                            new Notification();


                    notification.setUserId(
                            order.getBuyer().getId()
                    );


                    notification.setMessage(
                            "Order #"
                            + order.getId()
                            + " has been delivered 🚚"
                    );


                    notification.setRead(false);


                    notificationRepository.save(
                            notification
                    );
                }


            } else {

                throw new RuntimeException(
                        "Invalid Admin status change."
                );
            }


        } else {

            throw new RuntimeException(
                    "You are not allowed to update order status."
            );
        }


        return orderRepository.save(order);
    }


    // =========================================
    // UPDATE ORDER
    // =========================================

    @Override
    public Order updateOrder(
            Long id,
            Order order) {

        order.setId(id);

        return orderRepository.save(order);
    }


    // =========================================
    // DELETE ORDER
    // =========================================

    @Override
    public void deleteOrder(Long id) {

        orderRepository.deleteById(id);
    }
}