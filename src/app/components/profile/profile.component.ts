// Import other necessary modules/interfaces if needed

import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/api.service';

interface UserProfile {
  name: string;
  login: string;
  company?: string;
  location?: string;
  avatar_url: string;
  bio?: string;
  hireable?: boolean;
  blog?: string;
  email?: string;
  followers: number;
  following: number;
  public_gists: number;
  public_repos: number;
  html_url: string;
  twitter_username?: string;
}

@Component({
  selector: 'gg-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loading: boolean = false;
  profile: UserProfile | null = null;
  repos: any[] = [];
  username: string = '';
  currentPage = 1;
  pageSize = 10;
  maxPageSize = 100;

  constructor(private profileService: ProfileService) {}

  findProfile() {
    this.loading = true;
    this.profileService.updateProfile(this.username);

    this.profileService.getProfileInfo().subscribe((profile: UserProfile) => {
      this.profile = profile;
      this.loading = false;
    });

    this.fetchRepos();
  }

  fetchRepos() {
    this.profileService.getProfileRepos(this.currentPage, this.pageSize)
      .subscribe((repos) => {
        this.repos = repos;
      });
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.fetchRepos();
  }

  onPageSizeChange(event: any) {
    const newSize = event?.target?.value ? parseInt(event.target.value, 10) : 10;
    this.pageSize = newSize;
    this.currentPage = 1;
    this.fetchRepos();
  }
  

  ngOnInit() {}
}