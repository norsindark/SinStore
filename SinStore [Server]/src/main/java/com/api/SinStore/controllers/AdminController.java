package com.api.SinStore.controllers;

import com.api.SinStore.entities.User;
import com.api.SinStore.exceptions.UserNotFoundException;
import com.api.SinStore.payloads.requests.UpdateUserRequest;
import com.api.SinStore.services.Interfaces.AdminService;
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
}
