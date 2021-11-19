export class ChargeCard{
  token: string;
  amount: number;
  currency: string;
  description: string;

  constructor(token: string, amount: number, currency: string, description: string) {
    this.token = token;
    this.amount = amount;
    this.currency = currency;
    this.description = description;
  }
}
