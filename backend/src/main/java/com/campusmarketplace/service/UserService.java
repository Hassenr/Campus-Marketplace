package com.campusmarketplace.service;

import com.campusmarketplace.Entity.User;
import com.campusmarketplace.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
    }

    public User addUser(User user) {
        // Check for existing user before saving
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("User already exists with email: " + user.getUsername());
        }
        return userRepository.save(user);
    }

    public User getUserByUsername(String username) {
        //this will return null if user not found
        User user = userRepository.findByUsername(username);

        if (user==null) {
            throw new RuntimeException("User not found with username: " + username);
        } else {
            return user;
        }
    }

    public User updateUser(Long userId, User updatedUser) {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // Check if username is being changed and if it already exists
        if (!existingUser.getUsername().equals(updatedUser.getUsername()) &&
                userRepository.existsByUsername(updatedUser.getUsername())) {
            throw new RuntimeException("User already exists with username: " + updatedUser.getUsername());
        }

        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setCollege(updatedUser.getCollege());

        return userRepository.save(existingUser);
    }

    public void deleteUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found with id: " + userId);
        }
        userRepository.deleteById(userId);
    }


}
