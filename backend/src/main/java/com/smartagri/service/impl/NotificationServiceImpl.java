package com.smartagri.service.impl;

import com.smartagri.entity.Notification;
import com.smartagri.repository.NotificationRepository;
import com.smartagri.service.NotificationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationServiceImpl
        implements NotificationService {


    @Autowired
    private NotificationRepository notificationRepository;


    // SAVE NOTIFICATION
    @Override
    public Notification saveNotification(
            Notification notification) {

        notification.setRead(false);

        return notificationRepository.save(notification);
    }


    // GET USER NOTIFICATIONS
    @Override
    public List<Notification> getNotificationsByUserId(
            Long userId) {

        return notificationRepository
                .findByUserId(userId);
    }


    // MARK ONE AS READ
    @Override
    public void markAsRead(Long id) {

        Notification notification =
                notificationRepository
                        .findById(id)
                        .orElse(null);

        if (notification != null) {

            notification.setRead(true);

            notificationRepository.save(notification);
        }
    }


    // MARK ALL USER NOTIFICATIONS AS READ
    @Override
    public void markAllAsRead(Long userId) {

        List<Notification> notifications =
                notificationRepository
                        .findByUserIdAndIsReadFalse(userId);

        for (Notification notification : notifications) {

            notification.setRead(true);
        }

        notificationRepository.saveAll(notifications);
    }


    // DELETE NOTIFICATION
    @Override
    public void deleteNotification(Long id) {

        notificationRepository.deleteById(id);
    }
}