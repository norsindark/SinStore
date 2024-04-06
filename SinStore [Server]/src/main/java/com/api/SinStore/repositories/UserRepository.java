package com.api.SinStore.repositories;

import com.api.SinStore.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, String > {
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    Optional<User> findByForgotPasswordToken(String token);
}
