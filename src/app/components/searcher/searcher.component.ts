import { Component, EventEmitter, Output } from "@angular/core";

@Component({
	selector: "app-searcher",
	templateUrl: "./searcher.component.html",
	styleUrls: ["./searcher.component.scss"],
})
export class SearcherComponent {
	isEmpty: boolean = false;
	termToSearch: string = "saurabh9695";

	@Output() termToSearchEvent: EventEmitter<string> =
		new EventEmitter<string>();

	searchTerm(term: string): void {
		if (term.trim() === "" || !term) {
			this.isEmpty = true;
			return;
		}

		this.termToSearchEvent.emit(term);
	}
}
