import { GithubUser } from "@core/interfaces/user";

export const UserMapper = (user: any): GithubUser => ({
	avatar_url: user.avatar_url,
	bio: user.bio,
	blog: user.blog,
	created_at: user.created_at,
	followers: user.followers,
	following: user.following,
	html_url: user.html_url,
	id: user.id,
	location: user.location,
	login: user.login,
	name: user.name,
	public_repos: user.public_repos,
	repos_url: user.repos_url,
	twitter_username: user.twitter_username,
});
