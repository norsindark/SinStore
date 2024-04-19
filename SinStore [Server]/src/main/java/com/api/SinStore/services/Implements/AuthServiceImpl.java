package com.api.SinStore.services.Implements;

import com.api.SinStore.dtos.UserDto;
import com.api.SinStore.entities.Address;
import com.api.SinStore.entities.Cart;
import com.api.SinStore.entities.Role;
import com.api.SinStore.entities.User;
import com.api.SinStore.enums.RoleName;
import com.api.SinStore.exceptions.SignInException;
import com.api.SinStore.exceptions.SignUpException;
import com.api.SinStore.exceptions.UserNotFoundException;
import com.api.SinStore.payloads.requests.LoginRequest;
import com.api.SinStore.payloads.requests.PasswordRequest;
import com.api.SinStore.payloads.requests.SignUpRequest;
import com.api.SinStore.payloads.responses.ApiResponse;
import com.api.SinStore.payloads.responses.JwtResponse;
import com.api.SinStore.repositories.AddressRepository;
import com.api.SinStore.repositories.CartRepository;
import com.api.SinStore.repositories.RoleRepository;
import com.api.SinStore.repositories.UserRepository;
import com.api.SinStore.services.Interfaces.AuthService;
import com.api.SinStore.utils.JwtProviderUtils;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Component
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final AddressRepository addressRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final CartRepository cartRepository;

    private final JwtProviderUtils jwtProviderUtils;

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
                    .password(passwordEncoder.encode(signUpRequest.getPassword()))
                    .role(role)
                    .enabled(true)
                    .status("INACTIVE")
                    .build();
            User savedUser = this.userRepository.save(_user);
            Address _address = Address.builder()
                    .user(savedUser)
                    .city("")
                    .street("")
                    .country("")
                    .build();
            this.addressRepository.save(_address);

            Cart _cart = Cart.builder()
                    .userId(savedUser)
                    .build();
            this.cartRepository.save(_cart);
            return new ApiResponse("Create Successfully!", HttpStatus.CREATED);
        }
    }


    @Override
    public JwtResponse SignIn(LoginRequest request) throws SignInException {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
            User _user = this.userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new SignInException("Email or password is invalid!"));

            var token = jwtProviderUtils.generaTokenUsingEmail(_user);
            return JwtResponse.builder()
                    .accessToken(token)
                    .build();
        } catch (AuthenticationException e) {
            throw new SignInException("The account has not been verified!");
        }
    }

    @Override
    public String getRoleUser(UserDto request) throws UserNotFoundException {
        Optional<User> user = this.userRepository.findByEmail(request.getEmail());
        if (user.isEmpty()) {
            throw new UserNotFoundException("User not found with: " + request.getEmail());
        }
        return  user.get().getRole().getName();
    }

    @Override
    public Boolean checkResetPasswordToken(String token) throws UserNotFoundException {
        Optional<User> user = this.userRepository.findByForgotPasswordToken(token);
        if (user.isEmpty()) {
            throw new UserNotFoundException("User not found!");
        }
        return true;
    }

    @Override
    public ApiResponse changePassword(String token, PasswordRequest request) throws UserNotFoundException {
        Optional<User> user = this.userRepository.findByForgotPasswordToken(token);
        if (user.isEmpty()) {
            throw new UserNotFoundException("with token!" + token);
        }
        User _user = user.get();
        _user.setPassword(passwordEncoder.encode(request.getPassword()));
        this.userRepository.save(_user);
        return new ApiResponse("Password change successfully!", HttpStatus.OK);
    }
}
