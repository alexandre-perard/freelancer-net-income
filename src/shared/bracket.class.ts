// Copyright Alexandre Perard 2025
// Licensed under the EUPL-1.2 or later

export class Bracket {

  private initialAmount: number = 0;
  private min: number = 0;
  private max: number | null = 0;
  private amount: number = 0;
  private remainder: number = 0;
  private rate: number = 0;
  private result: number = 0;

  constructor(min: number, max: number | null, rate: number) {
    this.min = min;
    this.max = max;
    this.rate = rate;
  }

  getInitialAmount(): number {
    return this.initialAmount;
  }

  getMin(): number {
    return this.min;
  }

  getMax(): number | null {
    return this.max;
  }

  getAmount(): number {
    return this.amount;
  }

  getRemainder(): number {
    return this.remainder;
  }

  getRate(): number {
    return this.rate;
  }

  getResult(): number {
    return this.result;
  }

  setInitialAmount(initialAmount: number): void {
    this.initialAmount = initialAmount;
    this.updateCalculation();
  }

  updateCalculation(): void {
    if (this.initialAmount <= 0) {
      this.initialAmount = 0;
      this.amount = 0;
      this.remainder = 0;
      this.result = 0;
      return;
    }
    if (this.max === null) {
      this.amount = this.initialAmount;
      this.remainder = 0;
    } else {
      let bracketMaxAmount = this.max - this.min;
      this.amount = Math.min(bracketMaxAmount, this.initialAmount);
      this.remainder = this.initialAmount - this.amount;
    }
    this.result = this.amount * this.rate;
  }

}
