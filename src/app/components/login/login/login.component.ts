import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api'; // استيراد MessageService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService] // إضافة MessageService
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService); // حقن MessageService

  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  onSubmit(event: Event, login: FormGroup) {
    event.preventDefault();
    if (login.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);
      this.successMessage.set(null);
  
      this.authService.signIn(login.value).subscribe({
        next: (response) => {
          this.isLoading.set(false);
  
          const token = response.token;
          if (token) {
            // ✅ تخزين التوكن في localStorage
            localStorage.setItem('authToken', token);
  
            // ✅ تحديث حالة المصادقة
            this.authService.updateAuthStatus(token);
            localStorage.setItem('authToken', response.token); // ✅ حفظ التوكن
            this.authService.updateAuthStatus(response.token);
            
            // ✅ إظهار رسالة النجاح
            this.successMessage.set('Logged in successfully!');
            this.messageService.add({
              severity: 'success',
              summary: 'Login Successful',
              detail: 'Welcome back!'
            });
  
            // ✅ التوجيه فقط إذا كان التوكن موجود
            setTimeout(() => {
              this.router.navigate(['/social-home']);
            }, 500);
          } else {
            // في حالة مفيش توكن بالرسبونس
            this.messageService.add({
              severity: 'warn',
              summary: 'Login Warning',
              detail: 'Login succeeded but no token received.'
            });
          }
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMessage.set(err.error.message || 'Invalid email or password.');
          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: 'Invalid email or password.'
          });
        }
      });
    }
  }
  
}
