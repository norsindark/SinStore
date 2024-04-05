package com.api.SinStore.controllers;

import com.api.SinStore.dtos.UserDto;
import com.api.SinStore.entities.User;
import com.api.SinStore.exceptions.UserNotFoundException;
import com.api.SinStore.payloads.requests.PasswordRequest;
import com.api.SinStore.payloads.responses.ApiResponse;
import com.api.SinStore.services.Interfaces.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/client/user")
public class UserController {
    @Autowired
    private UserService userService;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/profile")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Optional<User>> getUserProfile() throws UserNotFoundException {
        return ResponseEntity.ok(this.userService.getUserByToken());
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/check-role")
    public ResponseEntity<String> getRoleUser(@RequestBody UserDto request) throws UserNotFoundException {
        return ResponseEntity.ok(this.userService.getRoleUser(request));
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<User> updateUser(
            @Valid @RequestBody UserDto request, @PathVariable String id
    ) throws UserNotFoundException {
        return ResponseEntity.ok(this.userService.updateUser(request, id));
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping("/change-password/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> changePassword(
            @Valid @RequestBody PasswordRequest request, @PathVariable String id
    ) throws UserNotFoundException {
        return ResponseEntity.ok(this.userService.changePassword(request, id));
    }
}
