import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-github-search',
  templateUrl: './github-search.component.html',
  styleUrls: ['./github-search.component.scss']
})
export class GithubSearchComponent {

  searchBar = new FormGroup({
    username: new FormControl('', Validators.required),
  });


  loader = false;
  userProfile: any;
  error: any;


  constructor(private gitHubService: ApiService, private router: Router) { }


  // ngOnInit() {
  //   this.search()
  // }

  search() {

    if (this.searchBar.valid) {
      const username = this.searchBar.value.username;
      this.loader = true;

      this.gitHubService.getUser(username).subscribe((users) => {
        console.log(users);
        this.userProfile = users;
        this.loader = false;
        this.router.navigate(['/repository', { user: username }]);
      },

        ((error) => {
          console.error(error);
          this.loader = false;
          if (error.status === 404) {
            this.error = "ures not found";
            this.router.navigate(['/UserNotFound',{ user: username}])

          } else {
            this.router.navigate(['/UserNotFound',{ user: username}])
            this.error = 'An error occurred. Please try sometime later...';
          }
        })
      );
    }
  }

  

}
