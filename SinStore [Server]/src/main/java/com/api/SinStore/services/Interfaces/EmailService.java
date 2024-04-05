package com.api.SinStore.services.Interfaces;

import com.api.SinStore.entities.User;
import jakarta.mail.MessagingException;

import java.io.UnsupportedEncodingException;

public interface EmailService {
    void sendPasswordResetEmail(User user, String token) throws MessagingException, UnsupportedEncodingException;
}
