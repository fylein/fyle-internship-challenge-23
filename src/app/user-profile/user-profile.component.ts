import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  // githubUsername$ = this.router.paramMap.pipe(map((params) => params.get("githubUsername")));
  githubUsername: string = '';

  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.githubUsername = this.router.snapshot.params['githubUsername'];
    console.log(this.router.snapshot.queryParams);
  }
}
