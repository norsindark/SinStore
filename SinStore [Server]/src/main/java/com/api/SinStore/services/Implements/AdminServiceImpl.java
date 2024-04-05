package com.api.SinStore.services.Implements;

import com.api.SinStore.entities.Role;
import com.api.SinStore.entities.User;
import com.api.SinStore.enums.RoleName;
import com.api.SinStore.exceptions.UserNotFoundException;
import com.api.SinStore.payloads.requests.UpdateUserRequest;
import com.api.SinStore.payloads.responses.ApiResponse;
import com.api.SinStore.repositories.RoleRepository;
import com.api.SinStore.repositories.UserRepository;
import com.api.SinStore.services.Interfaces.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Component
public class AdminServiceImpl implements AdminService {
    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    @Override
    @Transactional
    public List<User> getAllUser() {
        return this.userRepository.findAll();
    }

    @Override
    public ApiResponse updateUser(UpdateUserRequest user, String id) throws UserNotFoundException {
        Optional<User> user1 = this.userRepository.findById(id);
        if (user1.isEmpty()) {
            throw new RuntimeException("No user found with uuid " + id);
        }
        Role role = roleRepository.findByName(user.getRole());
        User _user = user1.get();
        _user.setFullName(user.getFullName());
        _user.setEmail(user.getEmail());
        _user.setRole(role);
        _user.setStatus(user.getStatus());
        if ("BAN".equalsIgnoreCase(user.getStatus())){
            _user.setEnabled(false);
        } else if ("ACTIVE".equalsIgnoreCase(user.getStatus()) || "INACTIVE".equalsIgnoreCase(user.getStatus())){
            _user.setEnabled(true);
        }
        this.userRepository.save(_user);
        return new ApiResponse("User updated successfully", HttpStatus.OK);
    }

    @Override
    public ApiResponse deleteUser(String id) throws UserNotFoundException {
        Optional<User> user = this.userRepository.findById(id);
        if (user.isEmpty()) {
            throw new UserNotFoundException("No user found with uuid " + id);
        }
        this.userRepository.deleteById(id);
        return new ApiResponse("User deleted successfully", HttpStatus.OK);
    }
}
