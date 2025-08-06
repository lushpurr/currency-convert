import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { CurrencyBlockComponent } from './shared-components/currency-block/currency-block.component';
import { CurrencyObject } from '../types/types';
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
  toValue: number = 0;
  selectedFromCurrency: CurrencyObject | undefined;
  selectedToCurrency: CurrencyObject | undefined;
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
    this.getRate('GBP', 'EUR', 1, 'from')
  }

  async selectDefaultCurrencies(){
     this.selectedFromCurrency = await this.currencyData.find((item) => item.name === 'Pound Sterling');
        console.log('selected', this.selectedFromCurrency)

        this.selectedToCurrency = await this.currencyData.find((item) => item.name === 'Euro')
        console.log('selected from currency', this.selectedToCurrency)

        // if(this.selectedFromCurrency && this.selectedToCurrency){
        //     this.getRate(this.selectedFromCurrency.short_code, this.selectedToCurrency.short_code, 1, 'from')

        // }
  }

  getRate(selectedFromCurrency: string, selectedToCurrency: string, amount: number, type: 'from' | 'to'){
    console.log(selectedFromCurrency);
    console.log(selectedToCurrency)
    this.dataService.calculateCurrencyValue(selectedFromCurrency, selectedToCurrency, amount).subscribe({
      next: (data) => {
        console.log('calculate response',data)
        if(data.value){
          if(type === 'to'){
            this.fromValue = data.value;
          } else {
             this.toValue = data.value;

          }
        }
      },
           error: (err) => {
        console.log('err', err)
        // this.errorMessage = err.message;
      },
    })
  }



  handleCurrencyChange(updatedCurrency: {value: number, currency:CurrencyObject}, type: 'from' | 'to'){
    console.log('handleCurrencyChange')
    console.log(updatedCurrency)
    console.log(type)
    if(type === 'from'){ 
      this.selectedFromCurrency = updatedCurrency.currency
      this.fromValue = updatedCurrency.value;
      // if this is from the 'from' currency object then we need it to be 
      // From currency first
      if(this.selectedFromCurrency && this.selectedToCurrency && this.fromValue){
        this.getRate(this.selectedFromCurrency.short_code, this.selectedToCurrency?.short_code, this.fromValue, type)
      }

    } else {
      this.selectedToCurrency = updatedCurrency.currency;
      this.toValue = updatedCurrency.value;
      if(this.selectedFromCurrency && this.selectedToCurrency && this.toValue){
        this.getRate(this.selectedToCurrency?.short_code, this.selectedFromCurrency.short_code, this.toValue, type)
      }
    }


  }
}
