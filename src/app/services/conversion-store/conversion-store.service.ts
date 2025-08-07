import { computed, Injectable, signal } from '@angular/core';
import { CurrencyObject } from 'src/app/types/types';

@Injectable({ providedIn: 'root' })

export class ConversionStore {
  fromValue = signal<number>(1);
  toValue = signal<number>(0);
  selectedFromCurrency = signal<CurrencyObject | null>(null);
  selectedToCurrency = signal<CurrencyObject | null>(null);

  fromDisplay = computed(() => {
    const currency = this.selectedFromCurrency();
    const value = this.fromValue();
    return currency ? { value, code: currency.short_code, name: currency.name } : null;
  });

  toDisplay = computed(() => {
    const currency = this.selectedToCurrency();
    const value = this.toValue();
    return currency && value > 0? { value, code: currency.short_code, name: currency.name } : null;
  });

  conversionText = computed(() => {
    const from = this.fromDisplay();
    const to = this.toDisplay();
    if (!from || !to) return '';
    return `${from.value.toFixed(2)} ${from.name} equals`;
  });

  setFromValue(value: number) {
    this.fromValue.set(value);
  }

  setToValue(value: number) {
    this.toValue.set(value);
  }

  setSelectedFromCurrency(currency: CurrencyObject | null) {
    this.selectedFromCurrency.set(currency);
  }

  setSelectedToCurrency(currency: CurrencyObject | null) {
    this.selectedToCurrency.set(currency);
  }
}