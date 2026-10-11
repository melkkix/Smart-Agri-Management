package com.smartagri.controller;

import com.smartagri.entity.Complaint;
import com.smartagri.repository.ComplaintRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "http://localhost:5173")
public class ComplaintController {

    @Autowired
    private ComplaintRepository complaintRepository;


    @PostMapping
    public Complaint createComplaint(
            @RequestBody Complaint complaint) {

        complaint.setStatus("Pending");

        return complaintRepository.save(complaint);
    }


    @GetMapping
    public List<Complaint> getAllComplaints() {

        return complaintRepository.findAll();
    }


    @GetMapping("/user/{userId}")
    public List<Complaint> getUserComplaints(
            @PathVariable Long userId) {

        return complaintRepository
                .findByUserId(userId);
    }


    @PutMapping("/{id}/status")
    public Complaint updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        Complaint complaint =
                complaintRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Complaint not found"
                                ));

        complaint.setStatus(status);

        return complaintRepository.save(complaint);
    }
}