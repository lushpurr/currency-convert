import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{

  currencyData: any[] = []
  errorMessage: string | null = null;

  constructor(
      private dataService: DataService
    ){}

  ngOnInit(): void {
    this.fetchCurrencyData()
  }

  async fetchCurrencyData(){
    this.dataService.fetchCurrencyData().subscribe({
      next: (data) => {
        this.currencyData = data;
        console.log('currency data', this.currencyData)
        this.errorMessage = null;
      },
      error: (err) => {
        console.log('err', err)
        // this.errorMessage = err.message;
      }
    })
  }
}
