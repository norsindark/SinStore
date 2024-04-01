package com.api.SinStore.services.Interfaces;

import com.api.SinStore.dtos.UserDto;
import com.api.SinStore.exceptions.SignUpException;
import com.api.SinStore.payloads.requests.LoginRequest;
import com.api.SinStore.payloads.requests.SignUpRequest;
import com.api.SinStore.payloads.responses.ApiResponse;
import com.api.SinStore.payloads.responses.JwtResponse;

public interface AuthService {
    ApiResponse SignUp(SignUpRequest signUpRequest) throws SignUpException;

    JwtResponse SignIn(LoginRequest loginRequest);
}
