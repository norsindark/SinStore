package com.api.SinStore.controllers;

import com.api.SinStore.payloads.requests.CartItemRequest;
import com.api.SinStore.payloads.responses.ApiResponse;
import com.api.SinStore.services.Interfaces.CartItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/client/user/cart-item")
public class CartItemController {

    private final CartItemService cartItemService;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/add")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> addCartItem(@RequestBody CartItemRequest request) {
        return ResponseEntity.ok(this.cartItemService.addCartItem(request));
    }
}
