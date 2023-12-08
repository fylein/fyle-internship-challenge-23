// display-section.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Repository {
  html_url: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-display-section',
  templateUrl: './display-section.component.html',
  styleUrls: ['./display-section.component.scss']
})
export class DisplaySectionComponent implements OnInit {
  repositories: Repository[] = [];
  username: string | undefined; // Define username as a property

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const state = history.state;
    if (state && state.repositories) {
      this.repositories = state.repositories;
      this.username = state.username; // Set the value of username if available
    }
  }
}
