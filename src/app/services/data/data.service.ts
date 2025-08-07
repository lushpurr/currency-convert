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

  saveConversion(fromCurrency: string, toCurrency: string, amount:number, result: number): Observable<any>{
    const body = {
      fromCurrency,
      toCurrency,
      amount,
      result
    }

    console.log('body in save conversion', body)

    return this.http
      .post(`https://my-currency-api-snowy.vercel.app/api/saveConversion`, body, {
        headers: { 'Content-Type': 'application/json'  }
      })
      .pipe(catchError(this.handleError));
  }

  fetchCurrencyData(): Observable<any>{
    const currencyType = 'flat';

    return this.http
      .get(`${this.apiUrl}currencies?type=${currencyType}`)
      .pipe(catchError(this.handleError));
  
  }

  calculateCurrencyValue(fromCurrency: string, toCurrency: string, amount: number): Observable<any>{
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
