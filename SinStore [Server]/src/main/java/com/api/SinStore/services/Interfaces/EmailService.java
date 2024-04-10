package com.api.SinStore.services.Interfaces;

import com.api.SinStore.entities.User;
import com.api.SinStore.payloads.responses.ApiResponse;
import jakarta.mail.MessagingException;

import java.io.UnsupportedEncodingException;

public interface EmailService {
    void sendPasswordResetEmail(User user, String token) throws MessagingException, UnsupportedEncodingException;

    void sendMailOrder(String orderId) throws MessagingException, UnsupportedEncodingException;
}
