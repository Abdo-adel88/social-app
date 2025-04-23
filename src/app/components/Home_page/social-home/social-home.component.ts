import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { OnlineFriendsComponent } from '../online-friends/online-friends.component';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { PopupPostComponent } from '../popup-post/popup-post.component';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { SpeedDialModule } from 'primeng/speeddial';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { DeletePostComponent } from '../delete-post/delete-post.component';
import { FormsModule } from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EditCommentComponent } from '../edit-comment/edit-comment.component';
import { LoadingHomeComponent } from '../loading-home/loading-home.component';
import { RightBarComponent } from '../right-bar/right-bar.component';
import { CustomDatePipe } from '../../../pipes/custom-date.pipe';
@Component({
  selector: 'app-social-home',
  standalone: true,
  imports: [
    CommonModule,
    MenubarModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    AvatarModule,
    OnlineFriendsComponent,
    DropdownModule,
    DialogModule,
    PopupPostComponent,
    SpeedDialModule,
    EditPostComponent,
    DeletePostComponent,
    FormsModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    EditCommentComponent,
    LoadingHomeComponent,
    RightBarComponent,
    CustomDatePipe
],
  providers: [ConfirmationService, MessageService],
  templateUrl: './social-home.component.html',
  styleUrls: ['./social-home.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SocialHomeComponent {
  items = [];
  private authService = inject(AuthService);
  userName: string = '';
  userImg: string = '';
  editingPost: any = null;
  isEditing: boolean = false;
  userId: string = '';
  rightBar: any;
  // الخصائص
  selectedPost: any = null; // سيتم تعيين البوست الذي سيتم تعديله هنا
  posts: any[] = [];
  showPopup: boolean = false;
  showPostDialog = false;
  bodyText: string = ''; // Property to hold the text of the post being edited
  selectedImage: string | null = null; // Property to hold the selected image
  commentInputs: { [postId: string]: string } = {};
  commentToDelete: { commentId: string; postId: string } | null = null;
  showDeleteCommentDialog: boolean = false;
  loading = true;
  ngOnInit(): void {
    this.authService.getUserProfile().subscribe({
      next: (res) => {
        this.userName = res.user.name;
        this.userImg = res.user.photo;
        this.userId = res.user._id;
        // نجيب أول بوست خاص بالمستخدم
        // نجيب أول بوستين خاصين بالمستخدم
        this.authService.getUserPosts(this.userId).subscribe({
          next: (userPostsRes) => {
            const userPosts = userPostsRes.posts.slice(0, 2); // أول اتنين بوست ليه
           
            // نجيب كل البوستات العامة
            this.authService.getAllPosts().subscribe({
              next: (res) => {
                const allPosts = res.posts.map((post: any) => ({
                  ...post,
                  showComments: false,
                }));

                if (userPosts.length > 0) {
                  const userPostsWithFlags = userPosts.map((post: any) => ({
                    ...post,
                    showComments: false,
                    isUserPost: true,
                  
                  
                  }));
                  this.loading = false
                  const filteredPosts = allPosts.filter(
                    (p: { _id: string }) =>
                      !userPosts.some((up: any) => up._id === p._id)
                  );

                  this.posts = [...userPostsWithFlags, ...filteredPosts];
                } else {
                  this.posts = allPosts;
                }
                this.loading = false;
              },
              error: (err) => {
                console.error('Error fetching all posts:', err);
              },
            });
          },
          error: (err) => {
            console.error('Error fetching user posts:', err);
            this.loading = false;
          },
        });
      },
      error: (err) => {
        console.error('Error fetching profile data:', err);
      },
    });
    // this.authService.getUserPosts(this.userId).subscribe({
    //   next: (res) => {
    //     this.posts = res.posts;
    //     this.loading = false;
    //   },
    //   error: () => {
    //     this.loading = false;
    //   }
    // });
  }

  private router = inject(Router);

  menuItems = [
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => {
        console.log('Logout command triggered');
        this.logout();
      },
    },
  ];

  logout(): void {
    // إضافة console log للتحقق من أن الدالة يتم استدعاؤها
    console.log('Logout button clicked!');

    // استدعاء دالة logout في الخدمة لضمان تنظيف أي بيانات أخرى متعلقة بالمستخدم
    this.authService.logout();

    // تأكد من أن التوجيه يحدث بشكل صحيح
    console.log('Navigating to authentication page...');
    this.router.navigate(['/authentication']);
  }

  closePopup() {
    this.showPopup = false;
  }

  editDialogVisible: boolean = false;

  openEditDialog(post: any) {
    this.selectedPost = post;
    this.editDialogVisible = true;
  }

  toggleComments(post: any) {
    post.showComments = !post.showComments;
  }

  getLatestComment(post: any) {
    if (post.comments && post.comments.length > 0) {
      return [...post.comments].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0];
    }
    return null;
  }
  toggleMenu(post: any, isComment: boolean = false) {
    if (!isComment) {
      // أغلق المنيو الخاص بالبوستات
      this.posts.forEach((p) => {
        if (p !== post) p.showMenu = false; // هنا بنغلق المنيو الخاص بالبوستات
      });
      post.showMenu = !post.showMenu; // هنا بنفتح المنيو الخاص بالبوست
    } else {
      // أغلق المنيو الخاص بالكومنتات
      this.posts.forEach((p) => {
        p.comments.forEach((c: any) => {
          if (c !== post) c.showCommentMenu = false; // هنا بنغلق المنيو الخاص بالكومنت
        });
      });
      post.showCommentMenu = !post.showCommentMenu; // هنا بنفتح المنيو الخاص بالكومنت
    }
  }

  // الدوال
  reloadPosts(): void {
    // من الممكن استدعاء API هنا لإعادة تحميل البوستات أو تحديثها
    this.ngOnInit(); // يمكنك استدعاء ngOnInit لإعادة تحميل البوستات
  }

  closeDialog(): void {
    this.showPopup = false; // إغلاق الـ Dialog بعد التعديل
  }

  // دوال أخرى كما هي
  openPopup() {
    this.isEditing = false; // تعيين الوضع إلى إضافة منشور جديد
    this.showPopup = true;
  }
  editPost(post: any) {
    this.selectedPost = post; // تعيين البوست الذي سيتم تعديله
    this.isEditing = true; // تعيين وضع التعديل
    this.showPopup = true; // فتح الـ popup
    this.bodyText = post.body; // تأكد من أن النص القديم يتم تعيينه
    this.selectedImage = post.image || null; // تعيين الصورة القديمة إذا كانت موجودة
  }

  selectedPostToDelete: any = null;
  showDeleteDialog: boolean = false;

  confirmDeletePost(post: any) {
    this.selectedPostToDelete = post;
    this.showDeleteDialog = true;
  }

  handleCancelDelete() {
    this.showDeleteDialog = false;
    this.selectedPostToDelete = null;
  }

  handleConfirmDelete(postId: string) {
    this.authService.deletePost(postId).subscribe({
      next: () => {
        console.log('Post deleted');
        this.reloadPosts(); // ودي دالة موجودة بالفعل عندك في نفس الكلاس

        this.showDeleteDialog = false;
        this.selectedPostToDelete = null;
      },
      error: (err) => {
        console.error('Delete error', err);
      },
    });
  }
  submitComment(postId: string) {
    const content = this.commentInputs[postId];
    if (!content || content.trim() === '') return;

    this.authService.createComment(content, postId).subscribe({
      next: (res) => {
        console.log('Comment created:', res);
        this.commentInputs[postId] = ''; // نمسح الانبوت
        this.reloadPosts(); // نعمل ريفرش للبوسات علشان يظهر الكومنت الجديد
      },
      error: (err) => {
        console.error('Error creating comment:', err);
      },
    });
  }
  editCommentDialogVisible: boolean = false;
  editingCommentContent: string = '';
  editingCommentId: string = '';
  
  editComment(comment: any) {
    console.log('Editing comment:', comment);
    this.editingCommentId = comment._id;
    this.editingCommentContent = comment.content;
    this.editCommentDialogVisible = true;
  }
  
  submitEditedComment() {
    this.authService.updateComment(this.editingCommentId, this.editingCommentContent).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Comment updated successfully' });
        this.editCommentDialogVisible = false;
        this.reloadPosts(); // إعادة تحميل البوستات
      },
      error: (err) => {
        console.error('Error updating comment:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update comment' });
      }
    });
  }
  

  // في الكومبوننت:
  

  selectedCommentId: string | null = null;
  selectedPostId: string | null = null;
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService, // لو عايز Toast بعد الحذف
  
  ) {}

  confirmDeleteComment(event: Event, commentId: string, postId: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this comment?',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.deleteComment(commentId, postId);
      },
      reject: () => {
        console.log('Comment deletion canceled');
      }
    });
  }
  deleteComment(commentId: string, postId: string) {
    this.authService.deleteComment(commentId).subscribe({
      next: () => {
        console.log('Comment deleted successfully');
        this.messageService.add({
          severity: 'success',
          summary: 'Deleted',
          detail: 'Comment deleted successfully'
        });
  
        this.reloadPosts(); // ✅ إعادة تحميل البوستات بعد الحذف
      },
      error: (err) => {
        console.error('Failed to delete comment', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete comment'
        });
      },
    });
  }
  
}
