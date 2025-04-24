import { Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication/authentication.component';
import { SocialHomeComponent } from './components/Home_page/social-home/social-home.component';
import { LoginComponent } from './components/login/login/login.component';
import { RegisterComponent } from './components/sign_up/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/authentication', pathMatch: 'full' }, // ✅ ده التعديل
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'social-home', component: SocialHomeComponent, canActivate: [AuthGuard] },
  { path: 'authentication', component: AuthenticationComponent, canActivate: [NoAuthGuard] },
  { path: '**', redirectTo: '/authentication', pathMatch: 'full' } // اختياري تعدله بنفس الطريقة
];
