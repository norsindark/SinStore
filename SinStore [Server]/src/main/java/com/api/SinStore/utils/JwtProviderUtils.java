package com.api.SinStore.utils;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Slf4j
@Component
public class JwtProviderUtils {
    @Value("${SinStore.app.jwtSecret}")
    private String jwtSecret;

    @Value("${SinStore.app.jwtExpirationMs")
    private String jwtExpired;

    public String generateTokenUsingEmail(String email) {
        String token = Jwts.builder()
                .subject(email)
                .expiration(new Date(System.currentTimeMillis() + jwtExpired))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
        return token;
    }

    public String getEmailFormJwtToken(String token) {
        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
        return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload().getSubject();
    }

    public boolean validateToken(String authToken) {
        try {
            SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
            Jwts.parser().verifyWith(key).build().parseSignedClaims(authToken);
            return true;
        } catch (JwtException ex) {
            log.error("Invalid or expired JWT token: {}", ex.getMessage());
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty.");
        }
        return false;
    }
}
