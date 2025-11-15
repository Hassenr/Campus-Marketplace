package com.campusmarketplace.service;

import com.campusmarketplace.Entity.Post;
import com.campusmarketplace.Entity.User;
import com.campusmarketplace.dto.PostRequest;
import com.campusmarketplace.repository.PostRepository;
import com.campusmarketplace.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final S3Service s3Service;
    private final UserRepository userRepository;

    public PostService(PostRepository postRepository, S3Service s3Service, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.s3Service = s3Service;
        this.userRepository = userRepository;
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public List<Post> getPostsByUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));
        return postRepository.findByOwner(user);
    }


    public Post getPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));
    }

    public Post addPost(String username, PostRequest postRequest, MultipartFile image) throws Exception {
        User owner = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));
        Post post = new Post();
        post.setTitle(postRequest.getTitle());
        post.setDescription(postRequest.getDescription());
        post.setAskingPrice(postRequest.getAskingPrice());
        post.setCategory(postRequest.getCategory());
        post.setOwner(owner);

        // Upload image if provided
        if (image != null && !image.isEmpty()) {
            String imageUrl = s3Service.uploadImage(image);
            post.setImageUrl(imageUrl);
        }

        return postRepository.save(post);
    }

    public Post updatePost(Long postId, String username, PostRequest postRequest, MultipartFile image) throws Exception {
        Post existingPost = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + postId));
        // Verify the authenticated user is the owner
        if (!existingPost.getOwner().getUsername().equals(username)) {
            throw new RuntimeException("Unauthorized: You can only update your own posts");
        }

        existingPost.setTitle(postRequest.getTitle());
        existingPost.setDescription(postRequest.getDescription());
        existingPost.setAskingPrice(postRequest.getAskingPrice());
        existingPost.setCategory(postRequest.getCategory());

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

    public void deletePost(Long postId, String username) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + postId));

        // Verify the authenticated user is the owner
        if (!post.getOwner().getUsername().equals(username)) {
            throw new RuntimeException("Unauthorized: You can only delete your own posts");
        }

        // Delete image from storage if exists
        if (post.getImageUrl() != null) {
            s3Service.deleteImage(post.getImageUrl());
        }

        postRepository.deleteById(postId);
    }


}
