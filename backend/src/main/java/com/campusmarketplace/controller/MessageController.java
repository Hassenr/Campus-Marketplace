package com.campusmarketplace.controller;

import com.campusmarketplace.Entity.Message;
import com.campusmarketplace.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/between")
    public ResponseEntity<List<Message>> getMessagesBetweenUsers(@RequestParam Long user1Id,
                                                                 @RequestParam Long user2Id) {
        List<Message> messages = messageService.getMessagesBetweenUsers(user1Id, user2Id);
        return ResponseEntity.ok(messages);
    }

    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(@RequestParam Long fromUserId,
                                               @RequestParam Long toUserId,
                                               @RequestBody String content) {
        Message message = messageService.sendMessage(fromUserId, toUserId, content);
        return ResponseEntity.ok(message);
    }

}
