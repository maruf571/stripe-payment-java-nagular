package com.marufh.psp.stripe.controller;


import com.marufh.psp.stripe.model.ChargeRequest;
import com.marufh.psp.stripe.model.ChargeResponse;
import com.marufh.psp.stripe.model.IntentRequest;
import com.marufh.psp.stripe.model.IntentResponse;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.PaymentIntent;
import com.stripe.param.ChargeCreateParams;
import com.stripe.param.PaymentIntentCaptureParams;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;

@Slf4j
@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/api/psp/stripe")
public class StripePspController {

    private final Environment environment;

    @PostConstruct
    private void init() {
        Stripe.apiKey= environment.getProperty("stripe.apikey");
    }

    /**
     * Create intent request with capture money,
     * remove
     * {code}.setCaptureMethod(PaymentIntentCreateParams.CaptureMethod.MANUAL){code}
     * if you do not want to capture
     */
    @PostMapping("/create-intent")
    public IntentResponse createIntent(@RequestBody IntentRequest intentRequest) throws StripeException {

        log.info("Processing intent: {}", intentRequest);

        Long totalAmount = intentRequest.getAmount() * 100;
        PaymentIntentCreateParams createParams =  PaymentIntentCreateParams.builder()
                    .setCurrency(intentRequest.getCurrency())
                    .setAmount(totalAmount)
                    .setDescription(intentRequest.getDescription())
                    .setCaptureMethod(PaymentIntentCreateParams.CaptureMethod.MANUAL)
                    .build();

            PaymentIntent intent = PaymentIntent.create(createParams);
            return IntentResponse.builder()
                    .intentId(intent.getId())
                    .clientSecret(intent.getClientSecret())
                    .build();
    }

    @PostMapping("/capture-money")
    public void captureMoney(@RequestBody IntentRequest intentRequest) throws StripeException {

        log.info("Capturing money: {}", intentRequest);

        PaymentIntent intent = PaymentIntent.retrieve(intentRequest.getIntentId());
        Long totalAmount = intentRequest.getAmount() * 100;

        PaymentIntentCaptureParams params = PaymentIntentCaptureParams.builder()
                        .setAmountToCapture(totalAmount)
                        .build();
        intent.capture(params);
    }

    /**
     * Old charge method, not recommended
     */
    @PostMapping("/charge-card")
    public ChargeResponse chargeCard(@RequestBody ChargeRequest chargeRequest) throws StripeException {

        log.info("Processing token: {}", chargeRequest);

        Long totalAmount = chargeRequest.getAmount() * 100;
        ChargeCreateParams chargeParams =  ChargeCreateParams.builder()
                .setAmount(totalAmount)
                .setCurrency(chargeRequest.getCurrency())
                .setSource(chargeRequest.getToken())
                .setDescription(chargeRequest.getDescription())
                .build();

        Charge charge = Charge.create(chargeParams);
        return ChargeResponse.builder()
                .id(charge.getId())
                .build();
    }

}
