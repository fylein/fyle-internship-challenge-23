import { Component, Input } from "@angular/core";
import { RepositoryUser } from "@core/interfaces/repository-user";

@Component({
	selector: "app-user-details",
	templateUrl: "./user-details.component.html",
	styleUrls: ["./user-details.component.scss"],
})
export class UserDetailsComponent {
	// @Input() githubUser: GithubUser = {} as GithubUser;
	@Input() githubUser: RepositoryUser = {} as RepositoryUser;
	currentDate: Date = new Date();
}
