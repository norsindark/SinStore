package com.api.SinStore.payloads.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AddressRequest {
    private String street;

    private String country;

    private String city;
}
