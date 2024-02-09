import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skeleton-user-card.component.html',
  styleUrl: './skeleton-user-card.component.scss',
})
export class SkeletonUserCardComponent {}
