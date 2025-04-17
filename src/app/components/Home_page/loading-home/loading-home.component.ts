import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-loading-home',
  standalone: true,
  imports: [CommonModule, SkeletonModule,CardModule],
  templateUrl: './loading-home.component.html',
  styleUrl: './loading-home.component.css'
})
export class LoadingHomeComponent {}
