import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { RegisterComponent } from '../../sign_up/register/register.component';
import { LoginComponent } from '../../login/login/login.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api'; // استيراد MessageService

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [RegisterComponent, LoginComponent, CommonModule, ToastModule], // تأكد من أنك قمت بإضافته هنا
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  providers: [MessageService], // تأكد من أنك قمت بإضافته هنا أيضًا
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthenticationComponent {
  isLogin = signal<boolean>(true);
  animate = signal<boolean>(false);

  constructor(private messageService: MessageService) {}

  isLoginMode() {
    return this.isLogin();
  }

  toggleMode() {
    this.animate.set(false);
    setTimeout(() => {
      this.isLogin.set(!this.isLogin());
      this.animate.set(true);
    }, 3000);
  }

  onRegistrationSuccess() {
    this.isLogin.set(true);

    // إظهار Toast عند النجاح
    
  }

  onLoginSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Login Successful',
      detail: 'Welcome back!'
    });
  }
}
