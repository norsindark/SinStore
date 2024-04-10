package com.api.SinStore.services.Implements;

import com.api.SinStore.dtos.OderStatusDto;
import com.api.SinStore.entities.*;
import com.api.SinStore.payloads.requests.OrderRequest;
import com.api.SinStore.repositories.*;
import com.api.SinStore.services.Interfaces.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import com.api.SinStore.payloads.responses.ApiResponse;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Component
@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    private final ProductRepository productRepository;

    private final OrderItemRepository orderItemRepository;

    private final UserRepository userRepository;

    private final CartItemRepository cartItemRepository;

    private final ProductWarehouseRepository productWarehouseRepository;

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public List<Order> getOrdersByUserId(OrderRequest request) {
        Optional<User> user = userRepository.findById(request.getUserId());
        if (user.isPresent()) {
            return orderRepository.findByUserId(user.get());
        }
        return Collections.emptyList();
    }

    @Override
    @Transactional
    public ApiResponse createNewOrder(OrderRequest request) {
        try {
            Optional<User> user = userRepository.findById(request.getUserId());
            if (user.isEmpty()) {
                return new ApiResponse("User not found", HttpStatus.NOT_FOUND);
            }

            List<CartItem> cartItems = this.cartItemRepository.findByCartId(user.get().getCart());
            if (cartItems.isEmpty()) {
                return new ApiResponse("Cart is empty", HttpStatus.BAD_REQUEST);
            }

            Order newOrder = Order.builder()
                    .userId(user.get())
                    .address(request.getAddress())
                    .city(request.getCity())
                    .country(request.getCountry())
                    .email(request.getEmail())
                    .fullName(request.getFullName())
                    .notes(request.getNotes())
                    .phone(request.getPhone())
                    .postalCode(request.getPostalCode())
                    .status("PENDING")
                    .totalPrice(user.get().getCart().getTotalPrice() + (user.get().getCart().getTotalPrice() * 0.1))
                    .build();
            this.orderRepository.save(newOrder);

            for (CartItem cartItem : cartItems) {
                Optional<Product> product = productRepository.findById(cartItem.getProductId().getId());
                if (product.isEmpty()) {
                    return new ApiResponse("Product not found", HttpStatus.NOT_FOUND);
                }
                ProductWarehouse productWarehouse = this.productWarehouseRepository.findByProductId(product.get());
                if (cartItem.getQuantity() > productWarehouse.getQuantityAvailable()) {
                    return new ApiResponse("Product out of stock", HttpStatus.BAD_REQUEST);
                }
                OrderItem _orderItem = OrderItem.builder()
                        .orderId(newOrder)
                        .productId(cartItem.getProductId())
                        .quantity(cartItem.getQuantity())
                        .build();
                this.orderItemRepository.save(_orderItem);

                productWarehouse.setQuantitySold(productWarehouse.getQuantitySold() + cartItem.getQuantity());
                productWarehouse.setQuantityAvailable(productWarehouse.getQuantityAvailable() - cartItem.getQuantity());
                this.productWarehouseRepository.save(productWarehouse);
            }
            this.cartItemRepository.deleteAll(cartItems);
            return new ApiResponse("Order added successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ApiResponse("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @Transactional
    public Order paymentOrder(OrderRequest request) {
        try {

            Optional<User> user = userRepository.findById(request.getUserId());

            if (user.isEmpty()) {
                new ApiResponse("User not found", HttpStatus.NOT_FOUND);
                return null;
            }

            List<CartItem> cartItems = this.cartItemRepository.findByCartId(user.get().getCart());
            if (cartItems.isEmpty()) {
                new ApiResponse("Cart is empty", HttpStatus.BAD_REQUEST);
                return null;
            }

            Order newOrder = Order.builder()
                    .userId(user.get())
                    .address(request.getAddress())
                    .city(request.getCity())
                    .country(request.getCountry())
                    .email(request.getEmail())
                    .fullName(request.getFullName())
                    .notes(request.getNotes())
                    .phone(request.getPhone())
                    .postalCode(request.getPostalCode())
                    .status("PENDING")
                    .totalPrice(user.get().getCart().getTotalPrice() + (user.get().getCart().getTotalPrice() * 0.1))
                    .build();

            this.orderRepository.saveAndFlush(newOrder);
            System.out.println("Order created");

            createOrderItems(newOrder, cartItems);
            System.out.println("Order items created");

            this.cartItemRepository.deleteAll(cartItems);
            System.out.println("Cart items deleted");

            return newOrder;
        } catch (Exception e) {
            return null;
        }
    }

    private void createOrderItems(Order newOrder, List<CartItem> cartItems) {
        System.out.println(newOrder.getId());
        Optional<Order> order = orderRepository.findById(newOrder.getId());
        if (order.isEmpty()) {
            System.out.println("Order not found");
            new ApiResponse("Order not found", HttpStatus.NOT_FOUND);
            return;
        }
        System.out.println("Order found");
        for (CartItem cartItem : cartItems) {
            Optional<Product> product = productRepository.findById(cartItem.getProductId().getId());
            if (product.isEmpty()) {
                new ApiResponse("Product not found", HttpStatus.NOT_FOUND);
                return;
            }
            ProductWarehouse productWarehouse = this.productWarehouseRepository.findByProductId(product.get());
            if (cartItem.getQuantity() > productWarehouse.getQuantityAvailable()) {
                new ApiResponse("Product out of stock", HttpStatus.BAD_REQUEST);
                return;
            }
            OrderItem _orderItem = OrderItem.builder()
                    .orderId(order.get())
                    .productId(cartItem.getProductId())
                    .quantity(cartItem.getQuantity())
                    .build();
            this.orderItemRepository.save(_orderItem);

            productWarehouse.setQuantitySold(productWarehouse.getQuantitySold() + cartItem.getQuantity());
            productWarehouse.setQuantityAvailable(productWarehouse.getQuantityAvailable() - cartItem.getQuantity());
            this.productWarehouseRepository.save(productWarehouse);
        }
    }


    @Override
    public ApiResponse updateOrder(OrderRequest order) {
        if (orderRepository.existsById(order.getUserId())) {
            return new ApiResponse("Order updated successfully", HttpStatus.OK);
        } else {
            return new ApiResponse("Order not found", HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public void updateOrderStatusWhenPayment(String id, String status) {
        try {
            Optional<Order> order = orderRepository.findById(id);
            if (order.isEmpty()) {
                new ApiResponse("Order not found", HttpStatus.NOT_FOUND);
                return;
            }
            order.get().setStatus(status);
            this.orderRepository.save(order.get());
            new ApiResponse("Order status updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            new ApiResponse("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ApiResponse updateOrderStatus(String id, OderStatusDto request) {
        try {
            Optional<Order> order = orderRepository.findById(id);
            if (order.isEmpty()) {
                return new ApiResponse("Order not found", HttpStatus.NOT_FOUND);
            }
            order.get().setStatus(request.getStatus());
            this.orderRepository.save(order.get());
            return new ApiResponse("Order status updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ApiResponse("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
