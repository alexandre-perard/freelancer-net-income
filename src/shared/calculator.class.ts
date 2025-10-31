// Copyright Alexandre Perard 2025
// Licensed under the EUPL-1.2 or later

import { PitSubcalculator } from "./pit-subcalculator.class";
import { SocoSubcalculator } from "./soco-subcalulator.class";

export class Calculator {

  private socoSubcalculator = new SocoSubcalculator();
  private pitSubcalculator = new PitSubcalculator();
  private annualRevenue: number = 0;
  private annualExpenses: number = 0;
  private minDeclaredExpenses: number = 0;
  private declaredExpenses: number = 0;
  private fictitiousExpenses: number = 0;
  private netProfit: number = 0;
  private profitAfterSoco: number = 0;
  private profitAfterSocoAndTaxes: number = 0;
  private annualNetIncome: number = 0;
  private monthlyNetIncome: number = 0;

  getSocoSubcalculator(): SocoSubcalculator {
    return this.socoSubcalculator;
  }

  getPitSubcalculator(): PitSubcalculator {
    return this.pitSubcalculator;
  }

  getAnnualRevenue(): number {
    return this.annualRevenue;
  }

  getAnnualExpenses(): number {
    return this.annualExpenses;
  }

  getMinDeclaredExpenses(): number {
    return this.minDeclaredExpenses;
  }

  getDeclaredExpenses(): number {
    return this.declaredExpenses;
  }

  getFictitiousExpenses(): number {
    return this.fictitiousExpenses;
  }

  getNetProfit(): number {
    return this.netProfit;
  }

  getProfitAfterSoco(): number {
    return this.profitAfterSoco;
  }

  getProfitAfterSocoAndTaxes(): number {
    return this.profitAfterSocoAndTaxes;
  }

  getAnnualNetIncome(): number {
    return this.annualNetIncome;
  }

  getMonthlyNetIncome(): number {
    return this.monthlyNetIncome;
  }

  setAnnualRevenue(annualRevenue: number): void {
    this.annualRevenue = annualRevenue;
    this.updateCalculation();
  }

  setAnnualExpenses(annualExpenses: number): void {
    this.annualExpenses = annualExpenses;
    this.declaredExpenses = annualExpenses;
    this.updateCalculation();
  }

  updateCalculation(): void {
    // Declared expenses (2025 rule)
    this.minDeclaredExpenses = Math.min(5930, 0.3 * this.annualRevenue);
    if (this.annualExpenses < this.minDeclaredExpenses) {
      this.declaredExpenses = this.minDeclaredExpenses;
    } else {
      this.declaredExpenses = this.annualExpenses;
    }
    this.fictitiousExpenses = this.declaredExpenses - this.annualExpenses;
    this.netProfit = this.annualRevenue - this.declaredExpenses;
    // Social contributions
    this.socoSubcalculator.setNetProfit(this.netProfit);
    this.profitAfterSoco = this.netProfit - this.socoSubcalculator.getSoco() - this.socoSubcalculator.getFundFee();
    // Personal income tax
    this.pitSubcalculator.setCalculationBasis(this.profitAfterSoco);
    this.profitAfterSocoAndTaxes = this.profitAfterSoco - this.pitSubcalculator.getPit() - this.pitSubcalculator.getMunicipalTax();
    this.annualNetIncome = this.profitAfterSocoAndTaxes + this.fictitiousExpenses;
    this.monthlyNetIncome = this.annualNetIncome / 12;
  }

}
