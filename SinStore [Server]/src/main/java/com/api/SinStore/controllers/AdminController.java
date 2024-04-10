package com.api.SinStore.controllers;

import com.api.SinStore.entities.Product;
import com.api.SinStore.entities.User;
import com.api.SinStore.entities.Warehouse;
import com.api.SinStore.exceptions.UserNotFoundException;
import com.api.SinStore.payloads.requests.ProductRequest;
import com.api.SinStore.payloads.requests.UpdateUserRequest;
import com.api.SinStore.payloads.requests.WarehouseRequest;
import com.api.SinStore.payloads.responses.ApiResponse;
import com.api.SinStore.services.Interfaces.AdminService;
import com.api.SinStore.services.Interfaces.ProductService;
import com.api.SinStore.services.Interfaces.WarehouseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/dashboard/")
public class AdminController {
    private final AdminService adminService;

    private final WarehouseService warehouseService;

    private final ProductService productService;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUser() {
        return ResponseEntity.ok(this.adminService.getAllUser());
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping("/user/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateUser(@RequestBody UpdateUserRequest user, @PathVariable String id)
            throws UserNotFoundException {
        return ResponseEntity.ok(this.adminService.updateUser(user, id));
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping("/user/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable String id) throws UserNotFoundException {
        return ResponseEntity.ok(this.adminService.deleteUser(id));
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/warehouses/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> addNewWarehouse(@RequestBody WarehouseRequest warehouse) {
        return ResponseEntity.ok(this.warehouseService.addNewWarehouse(warehouse));
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/warehouses/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Warehouse>> getAllWarehouses() {
        return ResponseEntity.ok(this.warehouseService.getAllWarehouses());
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/products/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> addNewProduct(@RequestBody ProductRequest product) {
        return ResponseEntity.ok(this.productService.addNewProduct(product));
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping("/products/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> updateProduct(@RequestBody ProductRequest product, @PathVariable String id) {
        return ResponseEntity.ok(this.productService.updateProduct(product, id));
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping("/products/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable String id) {
        return ResponseEntity.ok(this.productService.deleteProduct(id));
    }



}
