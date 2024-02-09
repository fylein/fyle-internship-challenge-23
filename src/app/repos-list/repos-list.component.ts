import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RepoCardComponent } from '../repo-card/repo-card.component';
import { Repo } from 'src/models/repo.model';
import { SkeletonRepoCardComponent } from '../skeleton-repo-card/skeleton-repo-card.component';

@Component({
  selector: 'app-repos-list',
  standalone: true,
  imports: [CommonModule, RepoCardComponent, SkeletonRepoCardComponent],
  templateUrl: './repos-list.component.html',
  styleUrl: './repos-list.component.scss',
})
export class ReposListComponent implements OnInit {
  @Input() repos: Repo[] = [];
  @Input() isLoading: boolean = true;
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
