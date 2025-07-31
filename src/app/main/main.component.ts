import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { DropdownModule } from "primeng/dropdown";
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, DropdownModule, ProgressSpinnerModule, FormsModule, BrowserAnimationsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{

  currencyData: any[] = []
  selectedCurrency: any = {};
  errorMessage: string | null = null;

  isLoadingDropdown: boolean = false;

  constructor(
      private dataService: DataService
    ){}

  ngOnInit(): void {
    this.fetchCurrencyData()
  }

  async fetchCurrencyData(){
    this.isLoadingDropdown = true;

    this.dataService.fetchCurrencyData().subscribe({
      next: (data) => {
        this.currencyData = data.response;
        console.log('currency data', this.currencyData)
        this.errorMessage = null;
        this.isLoadingDropdown = false;
      },
      error: (err) => {
        console.log('err', err)
        this.isLoadingDropdown = false;
        // this.errorMessage = err.message;
      },
      
    })
  }

  handleSelect(item: any){
    console.log(item)
  }
}
