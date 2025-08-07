import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConversionStore } from 'src/app/services/conversion-store/conversion-store.service';
import { DataService } from 'src/app/services/data/data.service';
import { SharedImports } from 'src/app/shared/shared-imports';

@Component({
  selector: 'app-conversion-result',
  standalone: true,
  imports: [SharedImports, CurrencyPipe, ProgressSpinnerModule],
  templateUrl: './conversion-result.component.html',
  styleUrl: './conversion-result.component.scss'
})
export class ConversionResultComponent {
  constructor(
    public store: ConversionStore,
    private dataService: DataService
  ){

  }

  saveConversion(){

    console.log('SAVE')
    const fromCurrencyName = this.store.selectedFromCurrency()?.name;
    const toCurrencyName = this.store.selectedToCurrency()?.name;
    const amount = this.store.fromValue();
    const result = this.store.toValue();
        console.log(fromCurrencyName, toCurrencyName, amount, result)


    if(!fromCurrencyName || !toCurrencyName || !amount || !result){ return };

    console.log(fromCurrencyName, toCurrencyName, amount, result)
    this.dataService.saveConversion(fromCurrencyName, toCurrencyName, amount, result).subscribe({
      next: () => console.log('Conversion saved'),
      error: (err) => console.error('Error saving conversion', err)
    })
  }




}
