import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Output, signal, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { passwordMatch } from '../../../custom-validation/match-password';
import { CalendarModule } from 'primeng/calendar';
import { Router } from '@angular/router'; // ✅ استيراد Router للتنقل
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CalendarModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router); // ✅ حقن Router للتنقل
  @Output() registrationSuccess = new EventEmitter<void>();
  constructor(private messageService: MessageService) {}
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  signupForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    ]],
    rePassword: ['', [
      Validators.required,
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    ]],
    dateOfBirth: [null, Validators.required],
    gender: ['', Validators.required]
  }, { validators: passwordMatch });

  onSubmit(event: Event, signup: FormGroup) {
    event.preventDefault();

    if (signup.valid) {
      this.authService.signUp(signup.value).subscribe({
        next: () => {
          this.registrationSuccess.emit(); // إرسال الحدث عند النجاح

          // إظهار الـ Toast عند النجاح
          this.messageService.add({ 
            severity: 'success', 
            summary: 'Registration Successful', 
            detail: 'You can now log in.' 
          });

          setTimeout(() => {
            this.router.navigate(['/authentication']); // التوجيه إلى صفحة authentication بعد النجاح
          }, 1500);
        },
        error: (err) => {
          this.messageService.add({ 
            severity: 'error', 
            summary: 'Error', 
            detail: err.error.message || 'An error occurred. Please try again.' 
          });
        }
      });
    }
  }
}
