package com.api.SinStore.controllers;

import com.api.SinStore.dtos.OderStatusDto;
import com.api.SinStore.entities.Order;
import com.api.SinStore.payloads.requests.OrderRequest;
import com.api.SinStore.payloads.responses.ApiResponse;
import com.api.SinStore.services.Interfaces.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/client/orders")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/create")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> createNewOrder(@Valid @RequestBody OrderRequest request) {
        return ResponseEntity.ok(orderService.createNewOrder(request));
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Order>> getOrdersByUserId( ) {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> updateOrder(@PathVariable String id, @RequestBody OderStatusDto status) {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
    }
}
