import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';

import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CurrencyBlockComponent } from './shared-components/currency-block/currency-block.component';
import { CurrencyObject } from '../types/types';
import { BrowserModule } from '@angular/platform-browser';
import { SharedImports, SharedPrimeNgImports } from '../shared/shared-imports';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ SharedImports, SharedPrimeNgImports, CurrencyBlockComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{

  currencyData: any[] = []
  fromValue:number = 1;
  toValue: number | null = null;
  selectedFromCurrency: CurrencyObject | null = null;
  selectedToCurrency: CurrencyObject | null = null;
  errorMessage: string | null = null;

  isLoadingDropdown: boolean = false;

  constructor(
      private dataService: DataService
    ){}

  ngOnInit(): void {
    this.fetchCurrencyData()
  }

  async fetchCurrencyData(){
    this.isLoadingDropdown = true;

    this.dataService.fetchCurrencyData().subscribe({
      next: (data) => {
        this.currencyData = data.response;
        console.log('currency data', this.currencyData)
       if(this.currencyData){
        this.initialiseValues()
        this.selectDefaultCurrencies()
       }
        this.errorMessage = null;
        this.isLoadingDropdown = false;
      },
      error: (err) => {
        console.log('err', err)
        this.isLoadingDropdown = false;
        // this.errorMessage = err.message;
      },
      
    })
  }

  initialiseValues(){
    this.selectDefaultCurrencies()
    this.getRate('GBP', 'EUR', 1)
  }

  async selectDefaultCurrencies(){
     this.selectedFromCurrency = await this.currencyData.find((item) => item.name === 'Pound Sterling');
        console.log('selected', this.selectedFromCurrency)

        this.selectedToCurrency = await this.currencyData.find((item) => item.name === 'Euro')
        console.log('selected from currency', this.selectedToCurrency)

        if(this.selectedFromCurrency && this.selectedToCurrency)
        this.getRate(this.selectedFromCurrency.short_code, this.selectedToCurrency.short_code, 1)
  }

  getRate(selectedFromCurrency: any, selectedToCurrency: any, amount: number){
    console.log(selectedFromCurrency);
    console.log(selectedToCurrency)
    this.dataService.calculateCurrencyValue(selectedFromCurrency, selectedToCurrency, amount).subscribe({
      next: (data) => {
        console.log('calculate response',data)
        if(data.value){
          this.toValue = data.value
        }
      },
           error: (err) => {
        console.log('err', err)
        // this.errorMessage = err.message;
      },
    })
  }



  handleCurrencyChange(selectedCurrency: CurrencyObject, type: 'from' | 'to'){
    console.log('handleCurrencyChange')
    console.log(selectedCurrency)
    console.log(type)
  }
}
