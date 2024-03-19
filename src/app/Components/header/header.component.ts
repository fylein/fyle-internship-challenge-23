import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private apiService: ApiService) {}
  value = '';
  result = {};
  repos = [];
  error: Boolean = false;
  message: string = '';

  handler = () => {
    this.apiService.setSearchVal(this.value);
    this.apiService.shimmer = true;
    this.apiService.getUser(this.value).subscribe(
      (response: any) => {
        this.result = response;
        this.apiService.setUser(this.result);
        this.error = false;
        this.apiService.apiResults[this.apiService.searchVal + '101'] =
          response;
        this.apiService.shimmer = false;
      },
      (err) => {
        this.error = true;
        if (err.error.message != 'Not Found') {
          this.message = err.error.message.split(' ').slice(0, 4).join(' ');
          this.apiService.shimmer = false;
          setTimeout(() => {
            this.error = false;
          }, 2000);
          return;
        }
        this.message =
          'Enter valid user name/Check Spelling - ' + err.error.message;
        this.apiService.shimmer = false;
        setTimeout(() => {
          this.error = false;
        }, 3000);
      }
    );

    this.apiService
      .getRepos(this.value, { per_page: 10, page: 1 })
      .subscribe((response: any) => {
        this.repos = response;
        this.apiService.setRepos(this.repos);
      });
  };
}
