package com.smartagri.repository;

import com.smartagri.entity.Notification;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository
        extends JpaRepository<Notification, Long> {

    // Get all notifications of a user
    List<Notification> findByUserId(Long userId);


    // Get only unread notifications
    List<Notification> findByUserIdAndIsReadFalse(Long userId);

}