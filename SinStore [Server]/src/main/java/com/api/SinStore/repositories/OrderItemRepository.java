package com.api.SinStore.repositories;

import com.api.SinStore.entities.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, String >{

}
