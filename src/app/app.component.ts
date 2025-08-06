import { Component } from '@angular/core';
import { SharedImports } from './shared/shared-imports';
import { MainComponent } from './main/main.component';
import { HttpClientModule } from '@angular/common/http';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedImports, MainComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'currency-converter';
}
