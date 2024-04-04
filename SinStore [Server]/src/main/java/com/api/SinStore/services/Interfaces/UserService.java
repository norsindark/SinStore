package com.api.SinStore.services.Interfaces;

import com.api.SinStore.dtos.UserDto;
import com.api.SinStore.entities.User;
import com.api.SinStore.exceptions.UserNotFoundException;

import java.util.Optional;
import java.util.UUID;

public interface UserService {
    Optional<User> getUserByToken() throws UserNotFoundException;

    String getRoleUser(UserDto request) throws UserNotFoundException;

    User updateUser(UserDto request, String id) throws UserNotFoundException;
}
