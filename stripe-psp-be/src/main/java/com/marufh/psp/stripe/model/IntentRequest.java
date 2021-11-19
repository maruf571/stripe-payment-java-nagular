package com.marufh.psp.stripe.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IntentRequest {
    private String currency;
    private Long amount;
    private String description;
    private String intentId;
}
