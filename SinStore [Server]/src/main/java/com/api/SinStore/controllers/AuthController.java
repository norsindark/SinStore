package com.api.SinStore.controllers;

import com.api.SinStore.dtos.UserDto;
import com.api.SinStore.exceptions.SignInException;
import com.api.SinStore.exceptions.SignUpException;
import com.api.SinStore.payloads.requests.LoginRequest;
import com.api.SinStore.payloads.requests.SignUpRequest;
import com.api.SinStore.payloads.responses.JwtResponse;
import com.api.SinStore.services.Interfaces.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> signUp(@Valid @RequestBody SignUpRequest signUpRequest) throws SignUpException {
        return new ResponseEntity<>(authService.SignUp(signUpRequest), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> signIn(@Valid @RequestBody LoginRequest loginRequest) throws SignInException {
        return new ResponseEntity<>(authService.SignIn(loginRequest), HttpStatus.OK);
    }
}
