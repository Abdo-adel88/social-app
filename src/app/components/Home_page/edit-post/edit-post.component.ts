import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, InputTextareaModule, FileUploadModule],
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnChanges {
  @Input() postToEdit: any = null;
  @Output() onPostUpdated = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<void>();

  bodyText: string = '';
  selectedImage: File | null = null;

  constructor(private authService: AuthService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['postToEdit'] && this.postToEdit) {
      this.bodyText = this.postToEdit.body || '';
      this.selectedImage = null;
    }
  }

  onFileSelected(event: any) {
    const file = event?.files?.[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  submitEdit(form: NgForm) {
    if (!this.postToEdit) return;

    const bodyText = form.value.body;
    const imageFile: File | null = this.selectedImage;

    this.authService.updatePost(this.postToEdit._id, bodyText, imageFile ?? undefined).subscribe({
      next: () => {
        this.bodyText = '';
        this.selectedImage = null;
        this.onPostUpdated.emit();
        this.onClose.emit();
      },
      error: (err) => console.error('Error updating post', err),
    });
  }

  closeDialog() {
    this.bodyText = '';
    this.selectedImage = null;
    this.onClose.emit();
  }
}
