package com.api.SinStore.services.Interfaces;

import com.api.SinStore.dtos.UserDto;
import com.api.SinStore.entities.User;
import com.api.SinStore.exceptions.UserNotFoundException;

import java.util.Optional;

public interface UserService {
    Optional<User> getUserByToken() throws UserNotFoundException;

    String getRoleUser(UserDto request) throws UserNotFoundException;
}
