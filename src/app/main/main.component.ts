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
    this.setDefaultCurrency('Pound Sterling', 'from');
    this.setDefaultCurrency('Euro', 'to')
    this.getRate('GBP', 'EUR', 1, 'from')
  }

  setDefaultCurrency(name: string, type: 'from' | 'to'){
    const currency = this.currencyData.find(curr => curr.name === name)
    if(!currency) return;

    type === 'from'
      ? this.store.setSelectedFromCurrency(currency)
      : this.store.setSelectedToCurrency(currency)
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

  hasRequiredValues(): boolean {
    return !!(this.store.selectedFromCurrency() && this.store.selectedToCurrency() && this.store.fromValue())
  }

  handleCurrencyChange(updatedCurrency: {value: number, currency: CurrencyObject}, type: 'from' | 'to') {
    console.log('handle currency change')
    if (type === 'from') {
      this.store.setSelectedFromCurrency(updatedCurrency.currency);
      this.store.setFromValue(updatedCurrency.value);

      if (this.hasRequiredValues()) {
        this.getRate(
          this.store.selectedFromCurrency()!.short_code,
          this.store.selectedToCurrency()!.short_code,
          this.store.fromValue(),
          type
        );
      }
    } else {
      this.store.setSelectedToCurrency(updatedCurrency.currency);
      this.store.setToValue(updatedCurrency.value);

      if (this.hasRequiredValues()) {
        this.getRate(
          this.store.selectedToCurrency()!.short_code,
          this.store.selectedFromCurrency()!.short_code,
          this.store.toValue(),
          type
        );
      }
    }
  }
}
