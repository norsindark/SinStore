package com.api.SinStore.services.Interfaces;

import com.api.SinStore.dtos.UserDto;
import com.api.SinStore.exceptions.SignInException;
import com.api.SinStore.exceptions.SignUpException;
import com.api.SinStore.exceptions.UserNotFoundException;
import com.api.SinStore.payloads.requests.LoginRequest;
import com.api.SinStore.payloads.requests.PasswordRequest;
import com.api.SinStore.payloads.requests.SignUpRequest;
import com.api.SinStore.payloads.responses.ApiResponse;
import com.api.SinStore.payloads.responses.JwtResponse;

public interface AuthService {
    ApiResponse SignUp(SignUpRequest signUpRequest) throws SignUpException;

    JwtResponse SignIn(LoginRequest request)throws SignInException;

    String getRoleUser(UserDto request) throws UserNotFoundException;

    Boolean checkResetPasswordToken(String email) throws UserNotFoundException;

    ApiResponse changePassword(String token, PasswordRequest request) throws UserNotFoundException;
}
