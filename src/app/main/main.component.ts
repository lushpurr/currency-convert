import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CurrencyBlockComponent } from './shared-components/currency-block/currency-block.component';
import { CurrencyObject } from '../types/types';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule, BrowserAnimationsModule, CurrencyBlockComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{

  currencyData: any[] = []
  fromValue:number = 1;
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

  selectDefaultCurrencies(){
     this.selectedFromCurrency = this.currencyData.find((item) => item.name === 'Pound Sterling');
        console.log('selected', this.selectedFromCurrency)

        this.selectedToCurrency = this.currencyData.find((item) => item.name === 'Euro')
        console.log('selected from currency', this.selectedToCurrency)
  }

  handleSelect(item: any){
    console.log(item)
  }

  handleCurrencyChange(selectedCurrency: CurrencyObject, type: 'from' | 'to'){
    console.log('handleCurrencyChange')
    console.log(selectedCurrency)
    console.log(type)
  }
}
