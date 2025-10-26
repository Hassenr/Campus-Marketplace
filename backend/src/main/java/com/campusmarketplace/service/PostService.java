package com.campusmarketplace.service;

import com.campusmarketplace.Entity.Post;
import com.campusmarketplace.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(Long id) {
        return postRepository.findById(id).get();
    }

    public Post addPost(Post post) {
        return postRepository.save(post);
    }

    public Post updatePost(Long postId, Post updatedPost) {

        if (!postRepository.existsById(postId)) {
            throw new RuntimeException("Post not found with id: " + postId);
        }

        Post existingPost = postRepository.findById(postId).get();

        existingPost.setTitle(updatedPost.getTitle());
        existingPost.setDescription(updatedPost.getDescription());
        existingPost.setPrice(updatedPost.getPrice());
        existingPost.setImageUrl(updatedPost.getImageUrl());
        existingPost.setCategory(updatedPost.getCategory());

        return postRepository.save(existingPost);
    }

    public void deletePost(Long postId) {
        if (!postRepository.existsById(postId)) {
            throw new RuntimeException("Post not found with id: " + postId);
        }

        postRepository.deleteById(postId);
    }
}

