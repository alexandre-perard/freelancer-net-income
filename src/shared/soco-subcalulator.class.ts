// Copyright Alexandre Perard 2025
// Licensed under the EUPL-1.2 or later

import { Bracket } from "./bracket.class";

export class SocoSubcalculator {

  private netProfit: number = 0;
  // 2025 values
  private minNetProfit: number = 17008.88;
  private calculationBasis: number = 0;
  private socoBrackets: Array<Bracket> = [
    new Bracket(0, 73447.52, 0.205),
    new Bracket(73447.52, 108238.40, 0.1416),
    new Bracket(108238.40, null, 0)
  ]; 
  private soco: number = 0;
  private fundFeeRate: number = 0.042; // 2025 rate for Partena Professional
  private fundFee: number = 0;

  getNetProfit(): number {
    return this.netProfit;
  }

  getMinNetProfit(): number {
    return this.minNetProfit;
  }

  getCalulationBasis(): number {
    return this.calculationBasis;
  }

  getSocoBrackets(): Array<any> {
    return this.socoBrackets;
  }

  getSoco(): number {
    return this.soco;
  }

  getFundFeeRate(): number {
    return this.fundFeeRate;
  }

  getFundFee(): number {
    return this.fundFee;
  }

  setNetProfit(netProfit: number): void {
      this.netProfit = netProfit;
      this.updateCalculation();
  }

  updateCalculation(): void {
    // Social contributions (2025 rule)
    this.soco = 0;
    this.calculationBasis = Math.max(this.netProfit, this.minNetProfit); 
    let remainder = this.calculationBasis;
    this.socoBrackets.forEach((bracket) => {
      bracket.setInitialAmount(remainder);
      remainder = bracket.getRemainder();
      this.soco += bracket.getResult();
    });
    // Social security fund fee
    this.fundFee = this.soco * this.fundFeeRate;
  }

}
