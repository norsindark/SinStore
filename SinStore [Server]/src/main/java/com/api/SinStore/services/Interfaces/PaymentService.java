package com.api.SinStore.services.Interfaces;

import com.api.SinStore.payloads.requests.OrderRequest;
import com.api.SinStore.payloads.requests.PaymentRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

public interface PaymentService {
    String createPaymentUrl(HttpServletRequest request,
                            HttpSession session,
                            String userId,
                            String fullName,
                            String country,
                            String city,
                            String address,
                            String postalCode,
                            String phone,
                            String email,
                            String notes
    )
            throws NoSuchAlgorithmException, UnsupportedEncodingException;

    String vnpayReturn(Map<String, String> params, HttpSession session) throws NoSuchAlgorithmException;
}
