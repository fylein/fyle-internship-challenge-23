import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Repo } from 'src/models/repo.model';

@Component({
  selector: 'app-repo-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './repo-card.component.html',
  styleUrl: './repo-card.component.scss',
})
export class RepoCardComponent {
  @Input() repo!: Repo;
}
