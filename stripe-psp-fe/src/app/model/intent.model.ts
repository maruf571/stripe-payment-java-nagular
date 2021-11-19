export class Intent{
  amount: number;
  currency: string;
  description: string;

  constructor(amount: number, currency: string, description: string) {
    this.amount = amount;
    this.currency = currency;
    this.description = description;

  }
}
