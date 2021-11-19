package com.marufh.psp.stripe.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChargeRequest {
    private String token;
    private Long amount;
    private String currency;
    private String description;
}
