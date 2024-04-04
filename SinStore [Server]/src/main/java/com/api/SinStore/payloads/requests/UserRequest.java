package com.api.SinStore.payloads.requests;

import com.api.SinStore.entities.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserRequest {

    private String fullName;

    private String phone;

    private String status;

    private boolean enabled;

}
