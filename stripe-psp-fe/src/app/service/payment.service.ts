import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ChargeCard} from "../model/chargecard.model";
import {Intent} from "../model/intent.model";

@Injectable({ providedIn: 'root'})
export class PaymentService {

  public api = environment.baseUrl + 'psp/stripe';
  constructor(private httpClient: HttpClient) {
  }

  public chargeCard(chargeCard: ChargeCard): Observable<any> {
    return this.httpClient.post(`${this.api}/charge-card`, chargeCard);
  }

  public createIntent(intent: Intent):Observable<any> {
    return this.httpClient.post(`${this.api}/create-intent`, intent);
  }

  public captureMoney(intent: any):Observable<any> {
    return this.httpClient.post(`${this.api}/capture-money`, intent);
  }

}
