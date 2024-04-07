package com.api.SinStore.repositories;

import com.api.SinStore.entities.Cart;
import com.api.SinStore.entities.CartItem;
import com.api.SinStore.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, String> {
    CartItem findByCartIdAndProductId(Cart cartId, Product productId);
}
