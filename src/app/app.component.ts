import { Component, inject } from "@angular/core";
import { Error } from "@core/interfaces/errors";
import { Repository, RepositoryResults } from "@core/interfaces/repository";
import { RepositoryUser } from "@core/interfaces/repository-user";
import { EMPTY, Observable, catchError, map, tap } from "rxjs";
import { GithubService } from "./services/github.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent {
	private _githubService: GithubService = inject(GithubService);
	repositoryResult$!: Observable<RepositoryResults>;

	title: string = "github-user-finder";
	githubUser: RepositoryUser = {} as RepositoryUser;
	loading: boolean = false;
	isError: boolean = false;
	errors: Error = {} as Error;
	topRepositories: any[] = [];

	ngOnInit(): void {
		this.getUser("saurabh9695");
	}

	public searchTerm(term: string): void {
		this.getUser(term);
	}
	public getUser(user: string): void {
		this._githubService
			.getRepositoryFromUser(user)
			.pipe(
				tap(({ success, repositoryUser }: RepositoryResults): void => {
					this.getRepositoriesWithMoreStars(repositoryUser.repos_url);
					this.loading = true;
				}),
				map(
					({ repositoryUser }: RepositoryResults): RepositoryUser =>
						repositoryUser,
				),

				catchError((error: Error) => {
					this.loading = true;
					this.errors = error;
					return EMPTY;
				}),
			)
			.subscribe(
				(repository: RepositoryUser): RepositoryUser =>
					(this.githubUser = repository),
			);

		this.loading = true;
		setTimeout((): void => {
			this.loading = false;
			this.isError = false;
		}, 3000);
	}

	getRepositoriesWithMoreStars(url: string): void {
		this._githubService
			.getRepositories(url)
			.pipe(
				map((repositories: Repository[]): Repository[] => {
					return (
						repositories
							.sort(
								(repoA: Repository, repoB: Repository): number =>
									repoB.stargazers_count - repoA.stargazers_count,
							)
							.slice(0, 3) || []
					);
				}),
			)
			.subscribe((resp: Repository[]): void => {
				this.topRepositories = resp;
			});
	}
}
