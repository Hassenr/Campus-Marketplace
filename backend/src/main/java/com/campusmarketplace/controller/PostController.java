package com.campusmarketplace.controller;

import com.campusmarketplace.Entity.Post;
import com.campusmarketplace.service.PostService;
import org.springframework.http.ResponseEntity;
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
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("askingPrice") Double askingPrice,
            @RequestParam("category") String category,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            Post saved = postService.addPost(title, description, askingPrice, category, image);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping(value = "/{postId}", consumes = "multipart/form-data")
    public ResponseEntity<Post> updatePost(
            @PathVariable Long postId,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("askingPrice") Double askingPrice,
            @RequestParam("category") String category,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        try {
            Post saved = postService.updatePost(postId, title, description, askingPrice, category, image);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> deletePost(@PathVariable Long postId) {
        try {
            postService.deletePost(postId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}