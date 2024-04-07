package com.api.SinStore.payloads.requests;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class CartItemRequest {

    private String productId;

    private int quantity;

    private String userId;
}
