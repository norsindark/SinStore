package com.api.SinStore.payloads.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PasswordRequest {
    @NotBlank(message = "Password can't be empty")
    @Size(min = 6, max = 64, message = "Password length must be between 6 and 64 characters")
    @Pattern(regexp = "^.{6,}$", message = "Password need more than 6 characters")
    private String password;
}
