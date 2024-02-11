import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Repo } from 'src/assets/repo.asset';

@Component({
  selector: 'app-repo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() repo!: Repo;
}
