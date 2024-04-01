package com.api.SinStore.services.Implements;

import com.api.SinStore.entities.Address;
import com.api.SinStore.entities.Role;
import com.api.SinStore.entities.User;
import com.api.SinStore.enums.RoleName;
import com.api.SinStore.exceptions.SignInException;
import com.api.SinStore.exceptions.SignUpException;
import com.api.SinStore.payloads.requests.LoginRequest;
import com.api.SinStore.payloads.requests.SignUpRequest;
import com.api.SinStore.payloads.responses.ApiResponse;
import com.api.SinStore.payloads.responses.JwtResponse;
import com.api.SinStore.repositories.AddressRepository;
import com.api.SinStore.repositories.RoleRepository;
import com.api.SinStore.repositories.UserRepository;
import com.api.SinStore.services.Interfaces.AuthService;
import com.api.SinStore.utils.JwtProviderUtils;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
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

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtProviderUtils jwtProviderUtils;

    @Override
    @Transactional
    public ApiResponse SignUp(SignUpRequest signUpRequest) throws SignUpException {
        String email = signUpRequest.getEmail();
        if (userRepository.existsByEmail(email)) {
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

    @Override
    public JwtResponse SignIn(LoginRequest loginRequest) {
        try {
            System.out.println("here");
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword())
            );

            System.out.println("here1");

            String jwt = jwtProviderUtils.generateTokenUsingEmail(loginRequest.getUsername());
            return JwtResponse.builder()
                    .accessToken(jwt)
                    .build();
        } catch (AuthenticationException e) {
            throw new UsernameNotFoundException("Username or password is invalid");
        }
    }
}
