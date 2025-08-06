import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyObject } from 'src/app/types/types';
import { SharedImports, SharedPrimeNgImports } from 'src/app/shared/shared-imports';


@Component({
  selector: 'app-currency-block',
  standalone: true,
  imports: [ SharedImports, SharedPrimeNgImports, FormsModule],
  templateUrl: './currency-block.component.html',
  styleUrl: './currency-block.component.scss'
})
export class CurrencyBlockComponent {

 
  @Input() currencyData: CurrencyObject[] | [] = [];
  @Input() value: number | null = 0;
  @Input() selectedCurrency: CurrencyObject | null = null; 
  @Output() currencyChange = new EventEmitter<{value: number, currency: CurrencyObject}>()


  handleChanges(){
    if(this.selectedCurrency && this.value !== null){
      this.currencyChange.emit({
        value: this.value,
        currency: this.selectedCurrency
      })
    }
  }

}
