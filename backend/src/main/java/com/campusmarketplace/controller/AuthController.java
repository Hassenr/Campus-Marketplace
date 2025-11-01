package com.campusmarketplace.controller;

import com.campusmarketplace.dto.LoginRequest;
import com.campusmarketplace.dto.RegisterRequest;
import com.campusmarketplace.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        boolean isValid = userService.verifyCredentials(
                request.getUsername(),
                request.getPassword()
        );

        if (isValid) {
            return ResponseEntity.ok(Map.of("message", "Login successful"));
        }
        return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        userService.registerUser(
                request.getUsername(),
                request.getPassword(),
                request.getEmail(),
                request.getCollege()
        );
        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
    }

}
