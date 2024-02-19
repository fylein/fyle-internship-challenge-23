import { Component, Input } from "@angular/core";

@Component({
	selector: "app-social-network",
	templateUrl: "./social-network.component.html",
	styleUrls: ["./social-network.component.scss"],
})
export class SocialNetworkComponent {
	@Input() blogPath: string = "";
	@Input() pathname!: string;
	@Input() iconID!: string;
}
