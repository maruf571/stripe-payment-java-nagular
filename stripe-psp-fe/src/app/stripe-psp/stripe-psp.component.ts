import {Component, OnInit} from '@angular/core';
import {StripeService} from "../service/stripe.service";
import {environment} from "../../environments/environment";
import {PaymentService} from "../service/payment.service";
import {Stripe} from "@stripe/stripe-js";
import {ChargeCard} from "../model/chargecard.model";
import {Intent} from "../model/intent.model";

@Component({
  selector: 'app-stripe-psp',
  templateUrl: './stripe-psp.component.html',
  styleUrls: ['./stripe-psp.component.scss']
})
export class StripePspComponent implements OnInit {

  private stripe!: Stripe;
  private card: any = null;
  private elements: any = null;
  public cardError: string = '';
  public chargeError: any = null;
  public charge: any = null;

  constructor(
    private readonly paymentService: PaymentService,
    private readonly stripeService: StripeService,) {
  }

  ngOnInit(): void {
    this.stripeService.initializeStripe().subscribe(() => {

      // @ts-ignore
      this.stripe = Stripe(environment.stripePublicKey);
      this.elements = this.stripe.elements();
      this.card = this.elements.create('card');
      this.card.mount('#card-element');
      this.card.addEventListener('change', (event: any) => event.error ? this.cardError = event.error.message : null);
    });
  }


  /**
   * Old style payment
   */
  public chargeCard(chargeCard: ChargeCard) {
    this.charge = null;
    this.chargeError = null;
    this.paymentService.chargeCard(chargeCard).subscribe(response => {
        this.charge = response;
        alert("Payment is done!")
      },
      error => this.chargeError = error
      );
  }

  public onPaymentOldStyle(amount: number, currency: string, description: string) {
    this.stripe.createToken(this.card).then((result: any) => {
      if (result.error) {
        this.cardError = result.error.message;
      } else {
        this.chargeCard(new ChargeCard(result.token.id, amount, currency, description));
      }
    });
  }

  public onPaymentNewStyle(amount: number, currency: string, description: string) {
    const intent = new Intent(amount, currency, description);
    this.paymentService.createIntent(intent).subscribe((result: any) => {
      if (result.error) {
        this.cardError = result.error.message;
      } else {
        this.makePayment(result);
      }
    });
  }

  public makePayment(intent: any) {
    this.stripe.confirmCardPayment(
      intent.clientSecret,
      {
        payment_method: {
          card: this.card
        }
      }).then( (resp: any) => {
      alert("Payment is done!")
      console.log(intent)
      this.paymentService.captureMoney({amount: 20, intentId: intent.intentId }).subscribe(resp => {
        console.log("Capture is done")
      })
    })
  }

}
