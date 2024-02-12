import { CommonModule } from '@angular/common';
import { Component, Input, OnInit} from '@angular/core';
import { CardComponent } from '../card/card.component';
import { LoadingCardComponent } from '../loading-card/loading-card.component';
import { Repo } from 'src/assets/repo.asset';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, CardComponent, LoadingCardComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent {
  @Input() repos: Repo[] = [];
  @Input() isLoading: boolean = true;
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
