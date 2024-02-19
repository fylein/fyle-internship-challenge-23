import { repository } from "@core/interfaces/repository-user";

export const RepositoryMapper = (repository: any): repository => ({
	description: repository.description,
	html_url: repository.html_url,
	name: repository.name,
	node_id: repository.node_id,
	stargazers_count: repository.stargazers_count,
});
