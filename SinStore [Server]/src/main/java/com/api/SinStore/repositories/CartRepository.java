package com.api.SinStore.repositories;

import com.api.SinStore.entities.Cart;
import com.api.SinStore.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, String>{
    Cart findByUserId(User userId);
}
