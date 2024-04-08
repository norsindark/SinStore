package com.api.SinStore.payloads.responses;

import com.api.SinStore.entities.Order;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponse {
    private ApiResponse apiResponse;
    private Order order;

    public OrderResponse(ApiResponse apiResponse) {
        this.apiResponse = apiResponse;
    }

    public OrderResponse(Order order) {
        this.order = order;
    }
}
