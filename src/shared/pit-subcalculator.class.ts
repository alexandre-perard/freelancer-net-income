// Copyright Alexandre Perard 2025
// Licensed under the EUPL-1.2 or later

import { Bracket } from "./bracket.class";

export class PitSubcalculator {

  private calculationBasis: number = 0;
  private pitBrackets: Array<Bracket> = this.createPitBrackets();
  private basicAmountForPersonalAllowance: number = 10910.00; // 2025 value
  private pitBeforeAllowance: number = 0;
  private allowanceBrackets: Array<Bracket> = this.createPitBrackets();
  private allowance: number = 0;
  private pit: number = 0;
  private municipalTaxRate: number = 0.06; // 2025 rate for Brussels City
  private municipalTax: number = 0;

  createPitBrackets() : Array<Bracket> {
    // 2025 values
    return [
      new Bracket(0, 16320.00, 0.25),
      new Bracket(16320.00, 28800.00, 0.40),
      new Bracket(28800.00, 49840.00, 0.45),
      new Bracket(49840.00, null, 0.50)
    ];
  }

  getCalulationBasis(): number {
    return this.calculationBasis;
  }

  getPitBrackets(): Array<any> {
    return this.pitBrackets;
  }

  getBasicAmountForPersonalAllowance(): number {
    return this.basicAmountForPersonalAllowance;
  }

  getPitBeforeAllowance(): number {
    return this.pitBeforeAllowance;
  }

  getAllowanceBrackets(): Array<any> {
    return this.allowanceBrackets;
  }

  getAllowance(): number {
    return this.allowance;
  }

  getPit(): number {
    return this.pit;
  }

  getMunicipalTaxRate(): number {
    return this.municipalTaxRate;
  }

  getMunicipalTax(): number {
    return this.municipalTax;
  }

  setCalculationBasis(calculationBasis: number): void {
      this.calculationBasis = calculationBasis;
      this.updateCalculation();
  }

  updateCalculation(): void {
    // Personal income tax (2025 rule)
    this.pitBeforeAllowance = 0;
    let remainder = this.calculationBasis;
    this.pitBrackets.forEach((bracket) => {
      bracket.setInitialAmount(remainder);
      remainder = bracket.getRemainder();
      this.pitBeforeAllowance += bracket.getResult();
    });
    this.allowance = 0;
    remainder = Math.min(this.basicAmountForPersonalAllowance, this.calculationBasis);
    this.allowanceBrackets.forEach((bracket) => {
      bracket.setInitialAmount(remainder);
      remainder = bracket.getRemainder();
      this.allowance += bracket.getResult();
    });
    this.pit = this.pitBeforeAllowance - this.allowance;
    // Municipal fee
    this.municipalTax = this.pit * this.municipalTaxRate;
    console.log([this.pitBeforeAllowance, this.allowance, this.pit]);
  }

}
