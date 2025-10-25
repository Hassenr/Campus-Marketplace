package com.campusmarketplace.service;

import com.campusmarketplace.Entity.Message;
import com.campusmarketplace.repository.MessageRepository;
import com.campusmarketplace.Entity.User;
import com.campusmarketplace.repository.UserRepository;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    public MessageService(MessageRepository messageRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }

    public List<Message> getMessagesBetweenUsers(Long user1Id, Long user2Id) {
        if (!userRepository.existsById(user1Id)) {
            throw new RuntimeException("User with ID " + user1Id + " not found");
        }
        if (!userRepository.existsById(user2Id)) {
            throw new RuntimeException("User with ID " + user2Id + " not found");
        }
        return messageRepository.findMessagesBetweenUsers(user1Id, user2Id);
    }

    public Message sendMessage(Long fromUserId, Long toUserId, String content) {
        User fromUser = userRepository.findById(fromUserId)
                .orElseThrow(() -> new RuntimeException("Sender user not found"));
        User toUser = userRepository.findById(toUserId)
                .orElseThrow(() -> new RuntimeException("Receiver user not found"));

        Message message = new Message();
        message.setFrom(fromUser);
        message.setTo(toUser);
        message.setContent(content);
        message.setTimestamp(LocalDateTime.now());

        return messageRepository.save(message);
    }

}
