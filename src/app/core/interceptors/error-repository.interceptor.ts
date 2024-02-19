import {
	HttpErrorResponse,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Error } from "@core/interfaces/errors";
import { catchError, throwError } from "rxjs";

@Injectable()
export class ErrorRepositoryInterceptor implements HttpInterceptor {
	constructor() {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler) {
		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				let errors: Error;

				if (error.error instanceof ErrorEvent) {
					errors = {
						message:
							"Something happened, check your URL. I have reached the limit of requests.",
						name: error.name,
						statusCode: error.status,
						status: error.ok,
					};
				} else {
					// ? error del servidor
					errors = {
						message: "Something happened on the server. !Try again",
						name: error.name,
						statusCode: error.status,
						status: error.ok,
					};
				}

				return throwError((): Error => errors);
			}),
		);
	}
}

/*

	if (this.txtUser !== "") {

		const userUrl: string = `${environment.API_URL}/${this.txtUser}`;

		this.githubService
			.getRepositoryFromUser(this.txtUser)
			.pipe(
				map((data: any): GithubUser => UserMapper(data)),
				catchError((error: any) => {
					this.isError = true;

					if (error?.status === 404 && !error.ok) {
						this.errors = {
							status: error.status,
							message: error.error.message,
							description: `Error in the request and/or User "${txtValue}" not found`,
						};
					}

					return of();
				}),
			)
			.subscribe((user: GithubUser): void => {
				this.getRepositoriesWithMoreStars(user.repos_url);
				this.githubUser = user;
			});

		this.txtUser = "";
	}
*/
