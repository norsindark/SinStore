package com.api.SinStore.payloads.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class ApiResponse {
    private String message;

    private HttpStatus httpStatus;
}
