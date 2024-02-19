import { Component, Input } from "@angular/core";
import { Repository } from "@core/interfaces/repository";

@Component({
	selector: "app-favorite-users",
	templateUrl: "./favorite-users.component.html",
	styleUrls: ["./favorite-users.component.scss"],
})
export class FavoriteUsersComponent {
	@Input() topRepositories: Repository[] = [];
	@Input() loading!: boolean;

	ngOnInit(): void {}
}
