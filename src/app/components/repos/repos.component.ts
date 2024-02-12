import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss'],
})
export class ReposComponent {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  @Input() repos: any;

  currentPage: number = 1;
  itemsPerPage: number = 10;
  pages: number[] = [];

  pagedRepos: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['repos']?.currentValue) {
      this.updatePagedRepos();
    }
  }

  pageChanged(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.updatePagedRepos();
  }

  private updatePagedRepos(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedRepos = this.repos.slice(startIndex, endIndex);
  }
}
