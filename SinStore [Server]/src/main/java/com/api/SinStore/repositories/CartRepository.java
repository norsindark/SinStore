package com.api.SinStore.repositories;

import com.api.SinStore.entities.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, String>{

}
