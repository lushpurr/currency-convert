
import { bootstrapApplication } from '@angular/platform-browser';
// import { MainComponent } from './app/main/main.component';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()]
}).catch(err => console.error(err));