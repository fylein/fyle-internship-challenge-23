import { Component, Input } from "@angular/core";

@Component({
	selector: "app-svg-icon",
	templateUrl: "./svg-icon.component.html",
	styleUrls: ["./svg-icon.component.scss"],
})
export class SvgIconComponent {
	@Input() iconID?: string = "";
	@Input() otherClass?: string = "";
}
