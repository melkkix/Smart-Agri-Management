package com.smartagri.controller;

import com.smartagri.entity.User;
import com.smartagri.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();


    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    // =========================================
    // REGISTER
    // =========================================

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        if (user.getEmail() == null ||
                user.getEmail().trim().isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .body("Email is required");
        }


        if (userRepository.findByEmail(user.getEmail()).isPresent()) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Email already registered");
        }


        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );


        User savedUser =
                userRepository.save(user);


        return ResponseEntity.ok(savedUser);
    }


    // =========================================
    // LOGIN
    // =========================================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody User loginUser) {

        Optional<User> optionalUser =
                userRepository.findByEmail(
                        loginUser.getEmail()
                );


        if (optionalUser.isEmpty()) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password");
        }


        User user =
                optionalUser.get();


        if (!passwordEncoder.matches(
                loginUser.getPassword(),
                user.getPassword()
        )) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid email or password");
        }


        // profileImage is automatically included
        // in the response

        return ResponseEntity.ok(user);
    }


    // =========================================
    // GET ALL USERS
    // =========================================

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {

        return ResponseEntity.ok(
                userRepository.findAll()
        );
    }


    // =========================================
    // GET USER BY ID
    // =========================================

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(
            @PathVariable Long id) {

        Optional<User> user =
                userRepository.findById(id);


        if (user.isEmpty()) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("User not found");
        }


        return ResponseEntity.ok(
                user.get()
        );
    }


    // =========================================
    // UPDATE PROFILE
    // =========================================

    @PutMapping("/{id}/profile")
    public ResponseEntity<?> updateProfile(
            @PathVariable Long id,
            @RequestBody Map<String, String> data) {

        Optional<User> optionalUser =
                userRepository.findById(id);


        if (optionalUser.isEmpty()) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("User not found");
        }


        User user =
                optionalUser.get();


        String name =
                data.get("name");

        String email =
                data.get("email");

        String profileImage =
                data.get("profileImage");


        // =====================================
        // VALIDATE NAME
        // =====================================

        if (name == null ||
                name.trim().isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .body("Name is required");
        }


        // =====================================
        // VALIDATE EMAIL
        // =====================================

        if (email == null ||
                email.trim().isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .body("Email is required");
        }


        // =====================================
        // CHECK DUPLICATE EMAIL
        // =====================================

        Optional<User> existingUser =
                userRepository.findByEmail(email);


        if (existingUser.isPresent() &&
                !existingUser.get().getId().equals(id)) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Email already registered");
        }


        // =====================================
        // UPDATE DETAILS
        // =====================================

        user.setName(
                name.trim()
        );

        user.setEmail(
                email.trim()
        );


        // =====================================
        // UPDATE PHOTO
        // =====================================

        user.setProfileImage(
                profileImage
        );


        User savedUser =
                userRepository.save(user);


        return ResponseEntity.ok(
                savedUser
        );
    }


    // =========================================
    // CHANGE PASSWORD
    // =========================================

    @PutMapping("/{id}/password")
    public ResponseEntity<?> changePassword(
            @PathVariable Long id,
            @RequestBody Map<String, String> data) {

        Optional<User> optionalUser =
                userRepository.findById(id);


        if (optionalUser.isEmpty()) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("User not found");
        }


        User user =
                optionalUser.get();


        String currentPassword =
                data.get("currentPassword");

        String newPassword =
                data.get("newPassword");

        String confirmPassword =
                data.get("confirmPassword");


        // =====================================
        // VALIDATION
        // =====================================

        if (currentPassword == null ||
                currentPassword.isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .body("Current password is required");
        }


        if (newPassword == null ||
                newPassword.length() < 6) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            "New password must contain at least 6 characters"
                    );
        }


        if (!newPassword.equals(confirmPassword)) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            "New password and confirm password do not match"
                    );
        }


        // =====================================
        // CHECK CURRENT PASSWORD
        // =====================================

        if (!passwordEncoder.matches(
                currentPassword,
                user.getPassword()
        )) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Current password is incorrect");
        }


        // =====================================
        // SAVE NEW PASSWORD
        // =====================================

        user.setPassword(
                passwordEncoder.encode(newPassword)
        );


        userRepository.save(user);


        return ResponseEntity.ok(
                "Password changed successfully"
        );
    }
}