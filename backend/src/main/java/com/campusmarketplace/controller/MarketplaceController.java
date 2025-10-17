package com.campusmarketplace.controller;

import com.campusmarketplace.Entity.User;
import com.campusmarketplace.repository.UserRepository;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping
public class MarketplaceController {
    private final UserRepository userRepository;

    public MarketplaceController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

}
