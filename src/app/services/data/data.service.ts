import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiKey = 'DAIQO2SUmcEW4Zv0FBllkgFz4oLYY55Z';
  private apiUrl = `https://api.currencybeacon.com/v1/currencies`;


  constructor(
    private http: HttpClient
  ) { }

  

  fetchCurrencyData(): Observable<any>{
    // https://api.currencybeacon.com/v1/latest?api_key=YOUR_API_KEY

    return this.http
      .get(`${this.apiUrl}?api_key=${this.apiKey}`)
      .pipe(catchError(this.handleError))
  
  }

  private handleError(error: HttpErrorResponse){
    console.error('API error: ', error.message);
    return throwError(() => new Error('Failed to fetch currency data'))
  }
}
