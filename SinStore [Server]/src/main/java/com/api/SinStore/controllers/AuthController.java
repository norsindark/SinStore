package com.api.SinStore.controllers;

import com.api.SinStore.dtos.UserDto;
import com.api.SinStore.entities.User;
import com.api.SinStore.exceptions.SignInException;
import com.api.SinStore.exceptions.SignUpException;
import com.api.SinStore.exceptions.UserNotFoundException;
import com.api.SinStore.payloads.requests.LoginRequest;
import com.api.SinStore.payloads.requests.SignUpRequest;
import com.api.SinStore.payloads.responses.ApiResponse;
import com.api.SinStore.payloads.responses.JwtResponse;
import com.api.SinStore.services.Interfaces.AuthService;
import com.api.SinStore.services.Interfaces.UserService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final UserService userService;

    @Autowired
    AuthService authService;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/register")
    public ResponseEntity<?> signUp(@Valid @RequestBody SignUpRequest signUpRequest) throws SignUpException {
        return new ResponseEntity<>(authService.SignUp(signUpRequest), HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(
            @Valid @RequestBody LoginRequest request
    ) throws SignInException {
        return ResponseEntity.ok(authService.SignIn(request));
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/check-role")
    public ResponseEntity<String> getRoleUser(@RequestBody UserDto request) throws UserNotFoundException {
        return ResponseEntity.ok(this.authService.getRoleUser(request));
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse> resetPassword(@RequestParam String email)
            throws UserNotFoundException, MessagingException, UnsupportedEncodingException {
        return ResponseEntity.ok(this.userService.forgotPassword(email));
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/reset-password-token")
    public ResponseEntity<Boolean> checkResetPasswordToken(@RequestParam String token)
            throws UserNotFoundException {
        return ResponseEntity.ok(this.authService.checkResetPasswordToken(token));
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/change-password")
    public ResponseEntity<ApiResponse> changePassword(@RequestParam String token, @RequestBody String password)
            throws UserNotFoundException {
        return ResponseEntity.ok(this.authService.changePassword(token, password));
    }
}
