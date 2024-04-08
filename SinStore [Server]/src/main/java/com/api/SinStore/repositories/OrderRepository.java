package com.api.SinStore.repositories;

import com.api.SinStore.entities.Order;
import com.api.SinStore.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, String>{
    List<Order> findByUserId(User userId);
}
