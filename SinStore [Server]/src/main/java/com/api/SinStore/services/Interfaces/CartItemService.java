package com.api.SinStore.services.Interfaces;

import com.api.SinStore.payloads.requests.CartItemRequest;
import com.api.SinStore.payloads.responses.ApiResponse;

public interface CartItemService {
    ApiResponse addCartItem(CartItemRequest request);
}
