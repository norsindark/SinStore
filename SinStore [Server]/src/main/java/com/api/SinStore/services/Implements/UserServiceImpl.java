package com.api.SinStore.services.Implements;

import com.api.SinStore.dtos.UserDto;
import com.api.SinStore.entities.Address;
import com.api.SinStore.entities.User;
import com.api.SinStore.exceptions.UserNotFoundException;
import com.api.SinStore.payloads.requests.PasswordRequest;
import com.api.SinStore.payloads.responses.ApiResponse;
import com.api.SinStore.repositories.AddressRepository;
import com.api.SinStore.repositories.UserRepository;
import com.api.SinStore.services.Interfaces.UserService;
import com.api.SinStore.utils.GetUserUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Component
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    private final AddressRepository addressRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public Optional<User> getUserByToken() throws UserNotFoundException {
        GetUserUtil userUtil = new GetUserUtil();
        String username = userUtil.getUserEmail();
        Optional<User> user = this.userRepository.findByEmail(username);
        if (user.isEmpty()) {
            throw new UserNotFoundException("User not found with: " + username);
        }
        return user;
    }

    @Override
    public String getRoleUser(UserDto request) throws UserNotFoundException {
        Optional<User> user = this.userRepository.findByEmail(request.getEmail());
        if (user.isEmpty()) {
            throw new UserNotFoundException("User not found with: " + request.getEmail());
        }
        return user.get().getRole().getName();
    }

    @Override
    public User updateUser(UserDto request, String id)  {
        Optional<User> user = this.userRepository.findById(id);
        if (user.isEmpty()) {
            throw new RuntimeException("No user found with uuid " + id);
        }
//        byte[] imageData = request.getAvatarUrl();
        User _user = user.get();
        _user.setFullName(request.getFullName());
        _user.setEmail(request.getEmail());
//        _user.setAvatarUrl(imageData);
        _user.setAbout(request.getAbout());
//        _user.setPassword(passwordEncoder.encode(request.getPassword()));
        _user.setPhone(request.getPhone());

        Optional<Address> address = this.addressRepository.findById(_user.getAddress().getId());
        if (address.isEmpty()) {
            throw new RuntimeException("No address found with uuid " + _user.getAddress().getId());
        }
        Address _address = address.get();
        _address.setCity(request.getAddress().getCity());
        _address.setPostalCode(request.getAddress().getPostalCode());
        _address.setCountry(request.getAddress().getCountry());
        _address.setStreet(request.getAddress().getStreet());

        this.addressRepository.save(_address);
        return this.userRepository.save(_user);
    };

    @Override
    public ApiResponse changePassword(PasswordRequest request, String id) throws UserNotFoundException {
        Optional<User> user = this.userRepository.findById(id);
        if (user.isEmpty()) {
            throw new UserNotFoundException("User not found with: " + id);
        }
        User _user = user.get();
        _user.setPassword(passwordEncoder.encode(request.getPassword()));
        this.userRepository.save(_user);
        return new ApiResponse("Password change successfully!", HttpStatus.OK);
    }
}
