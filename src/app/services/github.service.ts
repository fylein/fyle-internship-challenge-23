import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Repository, RepositoryResults } from "@core/interfaces/repository";
import { RepositoryUser } from "@core/interfaces/repository-user";
import { environment } from "@env/environment";
import { Observable, map } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class GithubService {
	private _httpClient: HttpClient = inject(HttpClient);

	constructor() {}

	getRepositoryFromUser(user: string): Observable<RepositoryResults> {
		const userUrl: string = `${environment.API_URL}/${user}`;

		return this._httpClient.get<RepositoryUser>(userUrl).pipe(
			map((repositoryUser: RepositoryUser): RepositoryResults => {
				return {
					repositoryUser: repositoryUser,
					error: "",
					status: 200,
					statusText: "",
					success: true,
				};
			}),
		);
	}

	public getRepositories(reposUrl: string = ""): Observable<Repository[]> {
		return this._httpClient
			.get<Repository[]>(reposUrl)
			.pipe(map((repositories: Repository[]): Repository[] => repositories));
	}
}
