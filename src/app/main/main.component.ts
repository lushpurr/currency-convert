import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { CurrencyBlockComponent } from './shared-components/currency-block/currency-block.component';
import { CurrencyObject } from '../types/types';
import { SharedImports, SharedPrimeNgImports } from '../shared/shared-imports';
import { ConversionResultComponent } from './conversion-result/conversion-result.component';
import { ConversionStore } from '../services/conversion-store/conversion-store.service';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ SharedImports, SharedPrimeNgImports, CurrencyBlockComponent, ConversionResultComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{

  currencyData: CurrencyObject[] | []= []
  // fromValue:number = 1;
  // toValue: number = 0;
  // selectedFromCurrency: CurrencyObject | undefined;
  // selectedToCurrency: CurrencyObject | undefined;
  errorMessage: string | null = null;

  isLoadingDropdown: boolean = false;

  constructor(
      private dataService: DataService,
      public store: ConversionStore
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
     const selectedFromCurr = await this.currencyData.find((item) => item.name === 'Pound Sterling');
     if(selectedFromCurr){
        this.store.setSelectedFromCurrency(selectedFromCurr);
     }

    const selectedToCurr = await this.currencyData.find((item) => item.name === 'Euro')
     if(selectedToCurr){
      this.store.setSelectedToCurrency(selectedToCurr);
     }

   
  }

  getRate(selectedFromCurrency: string, selectedToCurrency: string, amount: number, type: 'from' | 'to'){
    console.log(selectedFromCurrency);
    console.log(selectedToCurrency)
    this.dataService.calculateCurrencyValue(selectedFromCurrency, selectedToCurrency, amount).subscribe({
      next: (data) => {
        console.log('calculate response',data)
        if(data.value){
          if(type === 'to'){
            this.store.setFromValue(data.value);
          } else {
            this.store.setToValue(data.value);
          }
        }
      },
           error: (err) => {
        console.log('err', err)
        // this.errorMessage = err.message;
      },
    })
  }

  handleCurrencyChange(updatedCurrency: {value: number, currency: CurrencyObject}, type: 'from' | 'to') {
    console.log('handle currency change')
  if (type === 'from') {
    this.store.setSelectedFromCurrency(updatedCurrency.currency);
    this.store.setFromValue(updatedCurrency.value);

    if (this.store.selectedFromCurrency() && this.store.selectedToCurrency() && this.store.fromValue()) {
      this.getRate(
        this.store.selectedFromCurrency()!.short_code,
        this.store.selectedToCurrency()!.short_code,
        this.store.fromValue(),
        'from'
      );
    }
  } else {
    this.store.setSelectedToCurrency(updatedCurrency.currency);
    this.store.setToValue(updatedCurrency.value);

    if (this.store.selectedFromCurrency() && this.store.selectedToCurrency() && this.store.toValue()) {
      this.getRate(
        this.store.selectedToCurrency()!.short_code,
        this.store.selectedFromCurrency()!.short_code,
        this.store.toValue(),
        'to'
      );
    }
  }
}



  // handleCurrencyChange(updatedCurrency: {value: number, currency:CurrencyObject}, type: 'from' | 'to'){
  //   console.log('handleCurrencyChange')
  //   console.log(updatedCurrency)
  //   console.log(type)
  //   if(type === 'from'){ 
  //     this.selectedFromCurrency = updatedCurrency.currency
  //     this.fromValue = updatedCurrency.value;
  //     // if this is from the 'from' currency object then we need it to be 
  //     // From currency first
  //     if(this.selectedFromCurrency && this.selectedToCurrency && this.fromValue){
  //       this.getRate(this.selectedFromCurrency.short_code, this.selectedToCurrency?.short_code, this.fromValue, type)
  //     }

  //   } else {
  //     this.selectedToCurrency = updatedCurrency.currency;
  //     this.toValue = updatedCurrency.value;
  //     if(this.selectedFromCurrency && this.selectedToCurrency && this.toValue){
  //       this.getRate(this.selectedToCurrency?.short_code, this.selectedFromCurrency.short_code, this.toValue, type)
  //     }
  //   }


  // }
}
