package com.api.SinStore.services.Implements;

import com.api.SinStore.entities.Cart;
import com.api.SinStore.entities.CartItem;
import com.api.SinStore.entities.Product;
import com.api.SinStore.entities.User;
import com.api.SinStore.payloads.requests.CartItemRequest;
import com.api.SinStore.payloads.responses.ApiResponse;
import com.api.SinStore.repositories.CartItemRepository;
import com.api.SinStore.repositories.CartRepository;
import com.api.SinStore.repositories.ProductRepository;
import com.api.SinStore.repositories.UserRepository;
import com.api.SinStore.services.Interfaces.CartItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Component
@Service
@RequiredArgsConstructor
public class CartItemServiceImpl implements CartItemService {

    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    private final CartRepository cartRepository;

    @Override
    public ApiResponse addCartItem(CartItemRequest request) {
        Optional<User> user = userRepository.findById(request.getUserId());
        if (user.isEmpty()) {
            return new ApiResponse("User not found", HttpStatus.NOT_FOUND);
        }

        Optional<Product> product = productRepository.findById(request.getProductId());
        if (product.isEmpty()) {
            return new ApiResponse("Product not found", HttpStatus.NOT_FOUND);
        }

        if(product.get().getProductWarehouses().isEmpty() || product.get().getProductWarehouses().get(0).getQuantityAvailable() < request.getQuantity()){
            return new ApiResponse("Not enough quantity in stock", HttpStatus.NOT_FOUND);
        }

        Cart _cart = user.get().getCart();
        if (_cart == null) {
            _cart = new Cart();
            _cart.setUserId(user.get());
            this.cartRepository.save(_cart);
        }

        CartItem _cartItem = cartItemRepository.findByCartIdAndProductId(_cart, product.get());
        if (_cartItem != null) {
            if(_cartItem.getQuantity() + request.getQuantity() > product.get().getProductWarehouses().get(0).getQuantityAvailable()){
                return new ApiResponse("Not enough quantity in stock", HttpStatus.NOT_FOUND);
            }
            _cartItem.setQuantity(_cartItem.getQuantity() + request.getQuantity());
        } else {
            _cartItem = new CartItem();
            _cartItem.setCartId(_cart);
            _cartItem.setProductId(product.get());
            _cartItem.setQuantity(request.getQuantity());
        }
        this.cartItemRepository.save(_cartItem);
        return new ApiResponse("Item added to cart successfully!", HttpStatus.OK);
    }
}
