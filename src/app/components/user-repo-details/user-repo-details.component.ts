import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { finalize, forkJoin, take } from 'rxjs';

@Component({
  selector: 'app-user-repo-details',
  templateUrl: './user-repo-details.component.html',
  styleUrls: ['./user-repo-details.component.scss']
})

export class UserRepoDetailsComponent implements OnInit {
  public username: any;
  public userDetails: any;
  public repoDetails: any[] = []
  public currentPage = 1;
  public itemsPerPageOptions = [10, 20, 50, 100];
  public selectedItemsPerPage = 10;
  public notFoundError: boolean = false;
  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {
    this.spinner.show();
    this.username = this.apiService.userName;
    forkJoin({
      userDetails: this.apiService.getUser(this.username),
      repoDetails: this.apiService.getRepoDetails(this.username)
    }).pipe(
      take(1),
      finalize(() => this.spinner.hide())
    ).subscribe({
      next: (response) => {
        this.userDetails = response.userDetails;
        this.repoDetails = response.repoDetails;
      },
      error: (error) => {
        console.log(error)
        this.notFoundError = true;
        this.toastr.error('Error fetching User details:');
        this.spinner.hide();
      }
    })
  }
}



