package com.api.SinStore.payloads.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponse implements Serializable {

    private String vnp_ResponseCode;
    private String orderInfo;
    private String vnp_TransactionNo;
    private String vnp_Amount;
    private String vnp_BankCode;
    private String vnp_CardType;
    private String vnp_PayDate;
    private String vnp_TransactionStatus;
    private HttpStatus status;
    private String message;

}
