package com.api.SinStore.services.Implements;

import com.api.SinStore.entities.Category;
import com.api.SinStore.payloads.requests.CategoryRequest;
import com.api.SinStore.payloads.responses.ApiResponse;
import com.api.SinStore.repositories.CategoryRepository;
import com.api.SinStore.services.Interfaces.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Component
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public ApiResponse addNewCategory(String name) {
        Optional<Category> category = this.categoryRepository.findByName(name);
        if (category.isPresent()) {
            return new ApiResponse("Category already exists", HttpStatus.BAD_REQUEST);
        } else {
            Category _Category = new Category();
            _Category.setName(name);
            this.categoryRepository.save(_Category);
            return new ApiResponse("Category added successfully", HttpStatus.OK);
        }
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public ApiResponse deleteCategory(String id) {
        Optional<Category> category = this.categoryRepository.findById(id);
        if (category.isPresent()) {
            this.categoryRepository.deleteById(id);
            return new ApiResponse("Category deleted successfully", HttpStatus.OK);
        } else {
            return new ApiResponse("Category not found", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ApiResponse updateCategory(String id, CategoryRequest request) {
        Optional<Category> category = this.categoryRepository.findById(id);
        if (category.isPresent()) {
            Category _Category = category.get();
            _Category.setName(request.getName());
            this.categoryRepository.save(_Category);
            return new ApiResponse("Category updated successfully", HttpStatus.OK);
        } else {
            return new ApiResponse("Category not found", HttpStatus.BAD_REQUEST);
        }
    }
}
