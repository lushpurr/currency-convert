import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button'
import { DropdownModule } from 'primeng/dropdown'
import { ProgressSpinnerModule } from 'primeng/progressspinner';


import { HttpClientModule } from '@angular/common/http';


export const SharedImports = [
    CommonModule
]

export const SharedPrimeNgImports = [
    ButtonModule,
    DropdownModule, 
    ProgressSpinnerModule

]