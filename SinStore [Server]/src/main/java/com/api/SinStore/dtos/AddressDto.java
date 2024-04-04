package com.api.SinStore.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddressDto {

    @NotBlank(message = "street can't be empty")
    private String street;

    @NotBlank(message = "country can't be empty")
    private String country;

    @NotBlank(message = "city can't be empty")
    private String city;

    @NotBlank(message = "postalCode can't be empty")
    private int postalCode;
}
