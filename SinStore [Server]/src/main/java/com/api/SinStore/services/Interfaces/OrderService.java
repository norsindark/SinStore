package com.api.SinStore.services.Interfaces;

import com.api.SinStore.entities.Order;
import com.api.SinStore.payloads.requests.OrderRequest;
import com.api.SinStore.payloads.responses.ApiResponse;
import org.aspectj.weaver.ast.Or;

import java.util.List;

public interface OrderService {

    List<Order> getAllOrders();

    List<Order> getOrdersByUserId(OrderRequest request);

    ApiResponse createNewOrder(OrderRequest request);

    Order paymentOrder(OrderRequest request);

    ApiResponse updateOrder(OrderRequest request);

    void updateOrderStatusWhenPaymentSuccess(String orderId, String status);

}
