package com.api.SinStore.services.Interfaces;

import com.api.SinStore.dtos.OderStatusDto;
import com.api.SinStore.entities.Order;
import com.api.SinStore.payloads.requests.OrderRequest;
import com.api.SinStore.payloads.responses.ApiResponse;
import org.springframework.data.domain.jaxb.SpringDataJaxb;

import java.util.List;

public interface OrderService {

    List<Order> getAllOrders();

    List<Order> getOrdersByUserId(OrderRequest request);

    ApiResponse createNewOrder(OrderRequest request);

    Order paymentOrder(OrderRequest request);

    ApiResponse updateOrder(OrderRequest request);

    void updateOrderStatusWhenPayment(String orderId, String status);

    ApiResponse updateOrderStatus(String orderId, OderStatusDto request);

}
