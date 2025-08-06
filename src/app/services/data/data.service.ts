import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiKey = 'DAIQO2SUmcEW4Zv0FBllkgFz4oLYY55Z';
  private apiUrl = `https://api.currencybeacon.com/v1/`;


  constructor(
    private http: HttpClient
  ) { }

  

  fetchCurrencyData(): Observable<any>{
    // https://api.currencybeacon.com/v1/latest?api_key=YOUR_API_KEY
    const currencyType = 'flat';

    return this.http
      .get(`${this.apiUrl}currencies?type=${currencyType}&api_key=${this.apiKey}`)
      .pipe(catchError(this.handleError));
  
  }

  calculateCurrencyValue(fromCurrency: string, toCurrency: string, amount: number): Observable<any>{
    // https://api.currencybeacon.com/v1/convert
    //     from - Required - The base currency you would like to convert from.
    // to - Required - The currency you would like to convert to.
    // amount - Required - The amount to convert.
    console.log('currency convert input', fromCurrency, toCurrency, amount)

    return this.http
      .get(`${this.apiUrl}convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}&api_key=${this.apiKey}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse){
    console.error('API error: ', error.message);
    return throwError(() => new Error('Failed to fetch currency data'))
  }
}
