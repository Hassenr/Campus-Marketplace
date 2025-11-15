package com.campusmarketplace.controller;

import com.campusmarketplace.Entity.Post;
import com.campusmarketplace.dto.PostRequest;
import com.campusmarketplace.service.PostService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/mine")
    public List<Post> getAllMyPosts() {
        String username = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
        return postService.getPostsByUser(username);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<Post> getPostById(@PathVariable Long postId) {
        try {
            Post post = postService.getPostById(postId);
            return ResponseEntity.ok(post);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Post> addPost(
            @RequestPart("post") String postJson,
            @RequestPart(value = "image", required = false) MultipartFile image) {
        try {
            String username = SecurityContextHolder.getContext()
                    .getAuthentication()
                    .getName();

            ObjectMapper objectMapper = new ObjectMapper();
            PostRequest postRequest = objectMapper.readValue(postJson, PostRequest.class);

            Post saved = postService.addPost(username, postRequest, image);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping(value = "/{postId}", consumes = "multipart/form-data")
    public ResponseEntity<Post> updatePost(
            @PathVariable Long postId,
            @RequestPart("post") String postJson,
            @RequestPart(value = "image", required = false) MultipartFile image) {
        try {
            String username = SecurityContextHolder.getContext()
                    .getAuthentication()
                    .getName();

            ObjectMapper objectMapper = new ObjectMapper();
            PostRequest postRequest = objectMapper.readValue(postJson, PostRequest.class);

            Post saved = postService.updatePost(postId,username, postRequest, image);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> deletePost(@PathVariable Long postId) {
        try {
            String username = SecurityContextHolder.getContext()
                    .getAuthentication()
                    .getName();
            postService.deletePost(postId, username);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

}