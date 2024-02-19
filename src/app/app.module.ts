import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";

import { ErrorMessageComponent } from "@components/error-message/error-message.component";
import { FavoriteUsersComponent } from "@components/favorite-users/favorite-users.component";
import { LoadingComponent } from "@components/loading/loading.component";
import { SocialNetworkComponent } from "@components/social-network/social-network.component";
import { SvgIconComponent } from "@components/svg-icon/svg-icon.component";
import { ThemeComponent } from "@components/theme/theme.component";
import { UserDetailsComponent } from "@components/user-details/user-details.component";
import { SearcherComponent } from "@components/searcher/searcher.component";
import { ErrorRepositoryInterceptor } from "@core/interceptors/error-repository.interceptor";

@NgModule({
	declarations: [
		AppComponent,
		FavoriteUsersComponent,
		UserDetailsComponent,
		ErrorMessageComponent,
		LoadingComponent,
		ThemeComponent,
		SvgIconComponent,
		SocialNetworkComponent,
		SearcherComponent,
	],
	imports: [BrowserModule, FormsModule, HttpClientModule],
	providers: [ErrorRepositoryInterceptor],
	bootstrap: [AppComponent],
})
export class AppModule {}
