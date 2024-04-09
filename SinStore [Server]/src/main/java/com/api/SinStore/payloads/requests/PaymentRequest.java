package com.api.SinStore.payloads.requests;

import com.api.SinStore.entities.Order;
import com.api.SinStore.entities.OrderItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentRequest {
    private Order order;
    private List<OrderItem> orderItems;
}
