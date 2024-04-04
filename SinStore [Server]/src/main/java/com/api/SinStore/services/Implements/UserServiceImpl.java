package com.api.SinStore.services.Implements;

import com.api.SinStore.dtos.UserDto;
import com.api.SinStore.entities.User;
import com.api.SinStore.exceptions.UserNotFoundException;
import com.api.SinStore.repositories.UserRepository;
import com.api.SinStore.services.Interfaces.UserService;
import com.api.SinStore.utils.GetUserUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Component
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    @Override
    @Transactional
    public Optional<User> getUserByToken() throws UserNotFoundException {
        GetUserUtil userUtil = new GetUserUtil();
        String username = userUtil.getUserEmail();
        Optional<User> user = this.userRepository.findByEmail(username);
        if (user.isEmpty()) {
            throw new UserNotFoundException("User not found with: " + username);
        }
        System.out.println(user.get().getEmail());
        return user;
    }

    @Override
    public String getRoleUser(UserDto request) throws UserNotFoundException {
        Optional<User> user = this.userRepository.findByEmail(request.getEmail());
        if (user.isEmpty()) {
            throw new UserNotFoundException("User not found with: " + request.getEmail());
        }
        return  user.get().getRole().getName();
    }
}
