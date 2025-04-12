import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('authToken');
    if (token) {
      // ✅ لو فيه توكن، حوله على الصفحة الرئيسية
      this.router.navigate(['/social-home']);
      return false;
    }
    return true; // ✅ يقدر يدخل صفحة login أو register
  }
}
