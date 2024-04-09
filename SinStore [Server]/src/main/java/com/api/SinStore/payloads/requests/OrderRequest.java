package com.api.SinStore.payloads.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {

//    @NotBlank(message = "User ID cannot be empty")
//    private String userId;
//
//    @NotBlank(message = "Address cannot be empty")
//    private String address;
//
//    @NotBlank(message = "Country cannot be empty")
//    private String country;
//
//    @NotBlank(message = "City cannot be empty")
//    private String city;
//
//    @NotBlank(message = "Postal Code cannot be empty")
//    private String postalCode;
//
//    @NotBlank(message = "Phone cannot be empty")
//    @Size(min = 10, max = 10, message = "Phone should be 10 digits")
//    private String phone;
//
//    @NotBlank(message = "Email cannot be empty")
//    @Email(message = "Email should be valid")
//    private String email;
//
//    private String notes;
//
//    @NotBlank(message = "Full Name cannot be empty")
//    private String fullName;
//
//    private String status;


    @NotBlank(message = "User ID cannot be empty")
    private String userId;

    @NotBlank(message = "Full Name cannot be empty")
    @Pattern(regexp = "^[\\p{L}\\s]+$", message = "Country should contain only letters")
    private String fullName;

    @NotBlank(message = "Country cannot be empty")
    @Pattern(regexp = "^[\\p{L}\\s]+$", message = "Country should contain only letters")
    private String country;

    @NotBlank(message = "City cannot be empty")
    @Pattern(regexp = "^[\\p{L}\\s]+$", message = "Country should contain only letters")
    private String city;

    @NotBlank(message = "Address cannot be empty")
    private String address;

    @NotBlank(message = "Postal Code cannot be empty")
    @Size(min = 5, max = 5, message = "Postal Code should be 5 digits")
    @Pattern(regexp = "^[0-9]*$", message = "Postal Code should contain only digits")
    private String postalCode;

    @NotBlank(message = "Phone cannot be empty")
    @Size(min = 10, max = 12, message = "Phone should be 12 digits")
    @Pattern(regexp = "^[0-9]*$", message = "Phone should contain only digits")
    private String phone;

    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Email should be valid")
    private String email;

    @Size(max = 255, message = "Notes should be less than 255 characters")
    private String notes;

}