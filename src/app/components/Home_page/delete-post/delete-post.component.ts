import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-delete-post',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  templateUrl: './delete-post.component.html',
  styleUrl: './delete-post.component.css',
})
export class DeletePostComponent {
  @Input() visible: boolean = false;
  @Input() post: any;

  @Output() onCancel = new EventEmitter<void>();
  @Output() onConfirm = new EventEmitter<string>(); // نرسل postId فقط

  cancel() {
    this.onCancel.emit();
  }

  confirm() {
    this.onConfirm.emit(this.post?._id);
  }
}
