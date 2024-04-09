package com.api.SinStore.controllers;

import com.api.SinStore.payloads.requests.OrderRequest;
import com.api.SinStore.payloads.requests.PaymentRequest;
import com.api.SinStore.payloads.responses.PaymentResponse;
import com.api.SinStore.services.Interfaces.OrderService;
import com.api.SinStore.services.Interfaces.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/client/payment")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PaymentController {

    private final PaymentService paymentService;

    private final OrderService orderService;

    private final HttpServletRequest request;

    private final HttpServletResponse response;

    @GetMapping("/create-payment-url")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public String createPaymentUrl(HttpServletRequest request, HttpSession session,
                                   @RequestParam String userId,
                                   @RequestParam String fullName,
                                   @RequestParam String country,
                                   @RequestParam String city,
                                   @RequestParam String address,
                                   @RequestParam String postalCode,
                                   @RequestParam String phone,
                                   @RequestParam String email,
                                   @RequestParam String notes)
            throws NoSuchAlgorithmException, UnsupportedEncodingException {
        return paymentService.createPaymentUrl(request, session, userId, fullName, country, city, address, postalCode, phone, email, notes);
    }

    @GetMapping("/vnpay-return")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public PaymentResponse paymentCallback(@RequestParam Map<String, String> queryParams, HttpServletResponse response
            , HttpSession session)
            throws IOException {
        String vnp_ResponseCode = queryParams.get("vnp_ResponseCode");
        String orderInfo = queryParams.get("vnp_OrderInfo");

        PaymentResponse paymentResponse = new PaymentResponse();
        paymentResponse.setOrderInfo(orderInfo);

        if(vnp_ResponseCode.equals("00")) {
            String status = "PAID";
            orderService.updateOrderStatusWhenPaymentSuccess(orderInfo, status);
            paymentResponse.setMessage("PAY SUCCESS");
            paymentResponse.setStatus(HttpStatus.OK);
            return paymentResponse;
        } else {
            String status = "PAY FAILED";
            orderService.updateOrderStatusWhenPaymentSuccess(orderInfo, status);
            paymentResponse.setMessage("PAY FAILED");
            paymentResponse.setStatus(HttpStatus.BAD_REQUEST);
            return paymentResponse;
        }
    }
}