package com.api.SinStore.services.Interfaces;

import com.api.SinStore.entities.Category;
import com.api.SinStore.payloads.requests.CategoryRequest;
import com.api.SinStore.payloads.responses.ApiResponse;

import java.util.List;

public interface CategoryService {
    ApiResponse addNewCategory(String name);

    List<Category> getAllCategories();

    ApiResponse deleteCategory(String id);

    ApiResponse updateCategory(String id, CategoryRequest name);
}
