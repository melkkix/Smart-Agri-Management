package com.smartagri.controller;

import com.smartagri.entity.Notification;
import com.smartagri.service.NotificationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:5173")
public class NotificationController {


    @Autowired
    private NotificationService notificationService;


    // ==============================
    // ADD NOTIFICATION
    // ==============================

    @PostMapping
    public Notification addNotification(
            @RequestBody Notification notification) {

        return notificationService
                .saveNotification(notification);
    }


    // ==============================
    // GET USER NOTIFICATIONS
    // ==============================

    @GetMapping("/{userId}")
    public List<Notification> getNotifications(
            @PathVariable Long userId) {

        return notificationService
                .getNotificationsByUserId(userId);
    }


    // ==============================
    // MARK ONE AS READ
    // ==============================

    @PutMapping("/{id}/read")
    public String markAsRead(
            @PathVariable Long id) {

        notificationService
                .markAsRead(id);

        return "Notification marked as read";
    }


    // ==============================
    // MARK ALL AS READ
    // ==============================

    @PutMapping("/user/{userId}/read")
    public String markAllAsRead(
            @PathVariable Long userId) {

        notificationService
                .markAllAsRead(userId);

        return "All notifications marked as read";
    }


    // ==============================
    // DELETE
    // ==============================

    @DeleteMapping("/{id}")
    public String deleteNotification(
            @PathVariable Long id) {

        notificationService
                .deleteNotification(id);

        return "Notification deleted";
    }
}