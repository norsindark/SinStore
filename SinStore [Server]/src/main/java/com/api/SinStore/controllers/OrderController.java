package com.api.SinStore.controllers;

import com.api.SinStore.payloads.requests.OrderRequest;
import com.api.SinStore.payloads.responses.ApiResponse;
import com.api.SinStore.services.Interfaces.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/client/orders")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/create")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> createNewOrder(@RequestBody OrderRequest request) {
        return ResponseEntity.ok(orderService.createNewOrder(request));
    }
}
