// Copyright Alexandre Perard 2025
// Licensed under the EUPL-1.2 or later

import { Component, signal, WritableSignal, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Calculator } from '../shared/calculator.class';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  calculator = new Calculator();
  calculatorSignal: WritableSignal<Calculator> = signal(this.calculator);
  revenueFormControl = new FormControl<number|null>(null);
  expensesFormControl = new FormControl<number|null>(null);
  amountOfMoneyFormatter = new Intl.NumberFormat("en-UK", { style: "currency", currency: "EUR" });
  percentageFormatter = new Intl.NumberFormat("en-UK", { style: "percent", maximumFractionDigits: 2 });
  
  ngOnInit(): void {
    this.revenueFormControl.valueChanges.subscribe(() => {
      this.calculator.setAnnualRevenue(Number(this.revenueFormControl.value));
      this.updateResults();
    });
    this.expensesFormControl.valueChanges.subscribe(() => {
      this.calculator.setAnnualExpenses(Number(this.expensesFormControl.value));
      this.updateResults();
    });
  }

  updateResults(): void {
    this.calculatorSignal.set(this.calculator);
  }

  formatAmountOfMoney(n: number): string {
    return this.amountOfMoneyFormatter.format(n);
  }

  formatPercentage(n: number): string {
    return this.percentageFormatter.format(n);
  }

}
