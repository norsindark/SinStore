package com.api.SinStore.controllers;

import com.api.SinStore.payloads.requests.CategoryRequest;
import com.api.SinStore.payloads.responses.ApiResponse;
import com.api.SinStore.services.Interfaces.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/dashboard/categories")
public class CategoryController {

    private final CategoryService categoryService;


    @CrossOrigin(origins ="*", allowedHeaders = "*")
    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> addNewCategory(@RequestBody String name) {
        return ResponseEntity.ok(this.categoryService.addNewCategory(name));
    }

    @CrossOrigin(origins ="*", allowedHeaders = "*")
    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllCategories() {
        return ResponseEntity.ok(this.categoryService.getAllCategories());
    }

    @CrossOrigin(origins ="*", allowedHeaders = "*")
    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> deleteCategory(@PathVariable String id) {
        return ResponseEntity.ok(this.categoryService.deleteCategory(id));
    }

    @CrossOrigin(origins ="*", allowedHeaders = "*")
    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> updateCategory(@PathVariable String id, @RequestBody CategoryRequest name) {
        return ResponseEntity.ok(this.categoryService.updateCategory(id, name));
    }
}
