package com.api.SinStore.services.Interfaces;

import com.api.SinStore.entities.User;
import com.api.SinStore.exceptions.UserNotFoundException;
import com.api.SinStore.payloads.requests.UpdateUserRequest;
import com.api.SinStore.payloads.responses.ApiResponse;

import java.util.List;

public interface AdminService {
    List<User> getAllUser();

    ApiResponse updateUser(UpdateUserRequest user, String id) throws UserNotFoundException;

    ApiResponse deleteUser(String id) throws UserNotFoundException;
}
