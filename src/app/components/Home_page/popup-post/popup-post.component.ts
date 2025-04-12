import {
  Component,
  Output,
  EventEmitter,

} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
@Component({
  selector: 'app-popup-post',
  standalone: true,
  imports: [ButtonModule, InputTextareaModule, FileUploadModule, CommonModule, FormsModule],
  templateUrl: './popup-post.component.html',
  styleUrls: ['./popup-post.component.css']
})
export class PopupPostComponent {
  @Output() onPostCreated = new EventEmitter();
  @Output() onClose = new EventEmitter<void>();

  bodyText: string = '';
  selectedImage: File | null = null;

  constructor(private authService: AuthService) {}

  onFileSelected(event: any) {
    const file = event?.files?.[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  submitPost(form: NgForm) {
    const bodyText = form.value.body;
    const imageFile: File | null = this.selectedImage;

    if (imageFile) {
      this.authService.createPost(bodyText, imageFile).subscribe({
        next: () => {
          this.bodyText = '';
          this.selectedImage = null;
          this.onPostCreated.emit();
          this.onClose.emit();
        },
        error: (err) => console.error('Error creating post', err),
      });
    } else {
      console.error('No image selected');
    }
  }

  closeDialog() {
    this.bodyText = '';
    this.selectedImage = null;
    this.onClose.emit();
  }
}
