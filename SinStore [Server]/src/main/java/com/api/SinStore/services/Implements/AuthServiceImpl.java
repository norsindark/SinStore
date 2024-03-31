package com.api.SinStore.services.Implements;

import com.api.SinStore.entities.Address;
import com.api.SinStore.entities.Role;
import com.api.SinStore.entities.User;
import com.api.SinStore.enums.RoleName;
import com.api.SinStore.exceptions.SignUpException;
import com.api.SinStore.payloads.requests.SignUpRequest;
import com.api.SinStore.payloads.responses.ApiResponse;
import com.api.SinStore.repositories.AddressRepository;
import com.api.SinStore.repositories.RoleRepository;
import com.api.SinStore.repositories.UserRepository;
import com.api.SinStore.services.Interfaces.AuthService;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AuthServiceImpl implements AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    @Transactional
    public ApiResponse SignUp(SignUpRequest signUpRequest) throws SignUpException {
        String email = signUpRequest.getEmail();
        if(userRepository.existsByEmail(email)) {
            throw new SignUpException("This email: " + email + " already exists!");
        } else {
            Role role = roleRepository.findByName(RoleName.USER.toString());

            User _user = User.builder()
                    .fullName(signUpRequest.getFullName())
                    .email(signUpRequest.getEmail())
                    .password(encoder.encode(signUpRequest.getPassword()))
                    .role(role)
                    .enabled(false)
                    .status("UnActive")
                    .build();
            User savedUser = this.userRepository.save(_user);
            Address _address = Address.builder()
                    .user(savedUser)
                    .city("")
                    .street("")
                    .country("")
                    .build();
            this.addressRepository.save(_address);
            return new ApiResponse("Create Successfully!", HttpStatus.CREATED);
        }
    }
}
