import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';  // ✅ استيراد HttpClient
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient()  // ✅ إضافة HttpClient ليعمل في التطبيق
  ]
}).catch(err => console.error(err));
