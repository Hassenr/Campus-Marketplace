package com.campusmarketplace.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PostService {

    private final PostRepository repo;

    public PostService(PostRepository repo) {
        this.repo = repo;
    }

    // CREATE
    public Post create(Post post) {
        return repo.save(post);
    }

    // READ
    @Transactional(readOnly = true)
    public Post getById(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Post not found: " + id));
    }

    @Transactional(readOnly = true)
    public Page<Post> getAll(Pageable pageable) {
        return repo.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Page<Post> searchByTitle(String q, Pageable pageable) {
        return repo.findByTitleContainingIgnoreCase(q, pageable);
    }

    @Transactional(readOnly = true)
    public Page<Post> getByCategory(String category, Pageable pageable) {
        return repo.findByCategoryIgnoreCase(category, pageable);
    }

    // UPDATE (patch-style)
    public Post update(Long id, Post patch) {
        Post p = getById(id);
        if (patch.getTitle() != null) p.setTitle(patch.getTitle());
        if (patch.getDescription() != null) p.setDescription(patch.getDescription());
        if (patch.getPrice() != null) p.setPrice(patch.getPrice());
        if (patch.getCategory() != null) p.setCategory(patch.getCategory());
        return repo.save(p);
    }

    // DELETE
    public void delete(Long id) {
        if (!repo.existsById(id)) throw new RuntimeException("Post not found: " + id);
        repo.deleteById(id);
    }
}

