import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // To ensure security of API Key I created custom API endpoints on Vercel
  private apiUrl="https://my-currency-api-snowy.vercel.app/api/"


  constructor(
    private http: HttpClient
  ) { }

  

  fetchCurrencyData(): Observable<any>{
    // https://api.currencybeacon.com/v1/latest?api_key=YOUR_API_KEY
    const currencyType = 'flat';

    return this.http
      .get(`${this.apiUrl}currencies?type=${currencyType}`)
      .pipe(catchError(this.handleError));
  
  }

  calculateCurrencyValue(fromCurrency: string, toCurrency: string, amount: number): Observable<any>{
    // https://api.currencybeacon.com/v1/convert
    console.log('currency convert input', fromCurrency, toCurrency, amount)

    return this.http
      .get(`${this.apiUrl}convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse){
    console.error('API error: ', error.message);
    return throwError(() => new Error('Failed to fetch currency data'))
  }
}
