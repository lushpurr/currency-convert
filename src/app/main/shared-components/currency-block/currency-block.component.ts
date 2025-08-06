import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyObject } from 'src/app/types/types';

@Component({
  selector: 'app-currency-block',
  standalone: true,
  imports: [ CommonModule, FormsModule, DropdownModule, InputNumberModule],
  templateUrl: './currency-block.component.html',
  styleUrl: './currency-block.component.scss'
})
export class CurrencyBlockComponent {
  @Input() currencyData: CurrencyObject[] | undefined = undefined;
  @Input() value: number | null = null;
  @Input() selectedCurrency: any; 
  @Output() onCurrencyChange = new EventEmitter<CurrencyObject>()



  handleSelect(item: any){
    console.log(item)
    this.onCurrencyChange.emit(item)
  }

}
