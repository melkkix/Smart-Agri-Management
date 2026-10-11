package com.smartagri.service;

import com.smartagri.entity.Notification;

import java.util.List;

public interface NotificationService {

    Notification saveNotification(Notification notification);

    List<Notification> getNotificationsByUserId(Long userId);

    void markAsRead(Long id);

    void markAllAsRead(Long userId);

    void deleteNotification(Long id);
}