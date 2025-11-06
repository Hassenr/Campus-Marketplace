package com.campusmarketplace.service;

import com.campusmarketplace.Entity.Post;
import com.campusmarketplace.repository.PostRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final S3Service s3Service;

    public PostService(PostRepository postRepository, S3Service s3Service) {
        this.postRepository = postRepository;
        this.s3Service = s3Service;
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));
    }

    public Post addPost(String title, String description, Double askingPrice,
                        String category, MultipartFile image) throws Exception {
        Post post = new Post();
        post.setTitle(title);
        post.setDescription(description);
        post.setAskingPrice(askingPrice);
        post.setCategory(category);

        // Upload image if provided
        if (image != null && !image.isEmpty()) {
            String imageUrl = s3Service.uploadImage(image);
            post.setImageUrl(imageUrl);
        }

        return postRepository.save(post);
    }

    public Post updatePost(Long postId, String title, String description,
                           Double askingPrice, String category, MultipartFile image) throws Exception {
        Post existingPost = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + postId));

        existingPost.setTitle(title);
        existingPost.setDescription(description);
        existingPost.setAskingPrice(askingPrice);
        existingPost.setCategory(category);

        // Upload new image if provided
        if (image != null && !image.isEmpty()) {
            // Delete old image first
            if (existingPost.getImageUrl() != null) {
                s3Service.deleteImage(existingPost.getImageUrl());
            }

            String imageUrl = s3Service.uploadImage(image);
            existingPost.setImageUrl(imageUrl);
        }

        return postRepository.save(existingPost);
    }


    public void deletePost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + postId));

        // Delete image from storage if exists
        if (post.getImageUrl() != null) {
            s3Service.deleteImage(post.getImageUrl());
        }

        postRepository.deleteById(postId);
    }


}
