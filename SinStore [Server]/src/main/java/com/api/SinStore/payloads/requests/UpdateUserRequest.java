package com.api.SinStore.payloads.requests;

import com.api.SinStore.entities.Role;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserRequest {

    @Email
    @Column(unique = true)
    @NotBlank(message = "email can't be empty")
    private String email;

    @NotBlank(message = "name can't be empty")
    private String fullName;


    private String status;

    private String role;
}
