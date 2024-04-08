package com.api.SinStore.services.Interfaces;

import com.api.SinStore.entities.Order;
import com.api.SinStore.payloads.requests.OrderRequest;
import com.api.SinStore.payloads.responses.ApiResponse;
import com.api.SinStore.payloads.responses.OrderResponse;
import jakarta.validation.Valid;
import org.springframework.validation.BindingResult;

import java.util.List;

public interface OrderService {

    List<Order> getAllOrders();

    List<Order> getOrdersByUserId(OrderRequest request);

    ApiResponse createNewOrder(OrderRequest request);

    ApiResponse updateOrder(OrderRequest request);

}
