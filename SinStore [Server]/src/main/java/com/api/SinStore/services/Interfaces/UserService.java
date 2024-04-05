package com.api.SinStore.services.Interfaces;

import com.api.SinStore.dtos.UserDto;
import com.api.SinStore.entities.User;
import com.api.SinStore.exceptions.UserNotFoundException;
import com.api.SinStore.payloads.requests.PasswordRequest;
import com.api.SinStore.payloads.responses.ApiResponse;
import jakarta.mail.MessagingException;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

public interface UserService {
    Optional<User> getUserByToken() throws UserNotFoundException;

    String getRoleUser(UserDto request) throws UserNotFoundException;

    User updateUser(UserDto request, String id) throws UserNotFoundException;

    ApiResponse changePassword(PasswordRequest request, String id) throws UserNotFoundException;

    ApiResponse forgotPassword(String email) throws UserNotFoundException, MessagingException, UnsupportedEncodingException;

}
