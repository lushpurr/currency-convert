import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ConversionStore } from 'src/app/services/conversion-store/conversion-store.service';
import { SharedImports } from 'src/app/shared/shared-imports';

@Component({
  selector: 'app-conversion-result',
  standalone: true,
  imports: [SharedImports, CurrencyPipe],
  templateUrl: './conversion-result.component.html',
  styleUrl: './conversion-result.component.scss'
})
export class ConversionResultComponent {
  constructor(
    public store: ConversionStore
  ){

  }

}
