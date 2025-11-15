package com.campusmarketplace.dto;

import lombok.Data;

@Data
public class PostRequest {
    private String title;
    private String description;
    private Double askingPrice;
    private String category;

}
