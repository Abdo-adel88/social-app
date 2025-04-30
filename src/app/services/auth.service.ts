import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
// ✅ تعريف واجهة بيانات المستخدم لتسجيل الدخول
interface SigninData {
  email: string;
  password: string;
}

// ✅ تعريف واجهة بيانات المستخدم لتسجيل الحساب
interface SignupData {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  dateOfBirth: string;
  gender: string;
}

@Injectable({
  providedIn: 'root', // ✅ الخدمة متاحة في التطبيق بالكامل
})
export class AuthService {
  private baseUrl = 'https://linked-posts.routemisr.com/users';
  private apiUrl = 'https://linked-posts.routemisr.com/posts?limit=50';

  userProfile = signal<any | null>(null);
  userPosts = signal<any[]>([]);
  allPosts = signal<any[]>([]);
  isLoadingPosts = signal<boolean>(false);
  

  // ✅ استخدام Signals لتتبع حالة المستخدم
  isAuthenticated = signal<boolean>(false);
  userEmail = signal<string | null>(null);

  constructor(private http: HttpClient) {}
  loadUserProfile() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Token not found!');
      return;
    }

    const headers = new HttpHeaders().set('token', token);
    this.http.get(`${this.baseUrl}/profile-data`, { headers }).subscribe({
      next: (res: any) => {
        this.userProfile.set(res.user); // ✅ نحفظ البيانات في signal
        this.userEmail.set(res.user.email);
      },
      error: (err) => {
        console.error('Error loading profile:', err);
      },
    });
  }

  // ✅ تنفيذ طلب تسجيل الدخول
  signIn(userData: SigninData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signin`, userData);
  }

  // ✅ تنفيذ طلب تسجيل الحساب
  signUp(userData: SignupData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signup`, userData);
  }

  // ✅ تحديث حالة المصادقة
  updateAuthStatus(email: string) {
    this.isAuthenticated.set(true);
    this.userEmail.set(email);
  }

  // ✅ تسجيل الخروج

  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('authToken'); // هنا بنجيب التوكن من localStorage
    if (!token) {
      console.error('Token not found!'); // لو مفيش توكن موجود في ال localStorage
      return new Observable((observer) => {
        observer.error('Token not found!'); // لو مفيش توكن موجود في ال localStorage
      }); // لو مفيش توكن مفيش داعي نعمل request
    }

    const headers = new HttpHeaders().set('token', token); // إرسال التوكن في الهيدر باسم "token"
    return this.http.get(`${this.baseUrl}/profile-data`, { headers });
  }

  logout() {
    // إزالة التوكن من localStorage و sessionStorage
    console.log('Logging out...');
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');

    // تحديث حالة المصادقة وبيانات المستخدم
    this.isAuthenticated.set(false);
    this.userEmail.set(null);

    console.log('User logged out successfully.');
  }

  getAllPosts(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.get(this.apiUrl, { headers });
  }
  createPost(bodyText: string, imageFile: File): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('Token not found!');
      return new Observable((observer) => observer.error('Token not found!'));
    }

    const headers = new HttpHeaders().set('token', token);
    const formData = new FormData();
    formData.append('body', bodyText);
    formData.append('image', imageFile);

    return this.http.post(
      'https://linked-posts.routemisr.com/posts',
      formData,
      { headers }
    );
  }
  getUserPosts(userId: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('token', token || '');
    return this.http.get(
      `https://linked-posts.routemisr.com/users/${userId}/posts?limit=2`,
      { headers }
    );
  }

  updatePost(
    postId: string,
    bodyText: string,
    imageFile?: File
  ): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return new Observable((observer) => observer.error('Token not found!'));
    }

    const headers = new HttpHeaders().set('token', token);
    const formData = new FormData();
    formData.append('body', bodyText);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.http.put(
      `https://linked-posts.routemisr.com/posts/${postId}`,
      formData,
      { headers }
    );
  }
  deletePost(postId: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return new Observable((observer) => observer.error('Token not found!'));
    }

    const headers = new HttpHeaders().set('token', token);
    return this.http.delete(
      `https://linked-posts.routemisr.com/posts/${postId}`,
      { headers }
    );
  }
  createComment(content: string, postId: string) {
    const token = localStorage.getItem('authToken'); // ✅ استخدم نفس اسم المفتاح
    return this.http.post(
      'https://linked-posts.routemisr.com/comments',
      { content, post: postId },
      {
        headers: {
          token: token || '',
        },
      }
    );
  }
  deleteComment(commentId: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return new Observable((observer) => observer.error('Token not found!'));
    }

    const headers = new HttpHeaders().set('token', token);
    return this.http.delete(
      `https://linked-posts.routemisr.com/comments/${commentId}`,
      { headers }
    );
  }

  // ✅ تعديل تعليق
  updateComment(commentId: string, content: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return new Observable((observer) => observer.error('Token not found!'));
    }

    const headers = new HttpHeaders().set('token', token);
    return this.http.put(
      `https://linked-posts.routemisr.com/comments/${commentId}`,
      { content },
      { headers }
    );
  }
}
