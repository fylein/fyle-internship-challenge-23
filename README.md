# GitHub User Search App

This project is a GitHub user search application built using Angular. It allows users to search for GitHub users by username and view their repositories. The application fetches data from the GitHub API and displays the user's repositories with pagination and topic tags.

## Features

- **Search Bar**: Users can search for GitHub users by entering their username and clicking the search button.
- **Zero State**: If the user is not found, an empty zero state is displayed while keeping the search bar visible.
- **Repository Display**: Repositories of the searched user are displayed with pagination.
- **Topic Tags**: Each repository can have multiple topics, which are displayed as tags.
- **Server-side Pagination**: Pagination is implemented on the server-side to optimize performance. Users can navigate through pages using the pagination controls.
- **Repository Per Page Selection**: Users can select the number of repositories to display per page using a dropdown menu. By default, the application shows 10 repositories per page, but users can choose a maximum of 100 repositories per page.
- **Skeleton Loader**: When API calls are in progress, a skeleton loader is displayed to indicate loading.

## Implementation Details

- **API Documentation**: The project utilizes the GitHub REST API for fetching user information and repositories. Refer to the [GitHub API documentation](https://docs.github.com/en/rest/reference) for details.
- **Repository Forking**: Fork the provided repository before starting development. Push your changes to the forked branch once completed.
- **Search Functionality**: Implement a search bar to allow users to search GitHub users by username.
- **Zero State**: Display an empty state if the searched user is not found.
- **Pagination**: Implement server-side pagination with options to select page size and navigate through pages.
- **Skeleton Loader**: Display skeleton loaders while fetching data from the API to enhance the user experience.

## Setup and Development

To set up and develop the GitHub User Search App, follow these steps:

1. **Fork Repository**: Fork the provided repository [here](https://github.com/karthik-924/fyle-internship-challenge-23) to your GitHub account.
2. **Clone Repository**: Clone the forked repository to your local machine. 
    ```bash
    git clone https://github.com/your-username/fyle-internship-challenge-23.git
    ```
3. **Install Dependencies**: Install project dependencies using npm or yarn.
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```
4. **Run Development Server**: Start the development server to view the application in your browser.
    ```bash
    ng serve
    ```
5. **Development**: Develop new features, implement pagination, and ensure responsiveness for mobile devices.
6. **Testing**: Test the application locally to ensure all features are working as expected.
7. **Deployment**: Once development is complete, deploy the application to a hosting service.

## Mobile Responsiveness

The GitHub User Search App is designed to be mobile responsive, ensuring a seamless experience across various devices and screen sizes. The layout and UI elements adapt dynamically to provide optimal usability on mobile devices.

## Credits

This project is part of an internship challenge and was created by Karthik Emmadi.

## Deployment Link

The GitHub User Search App is deployed on Netlify. You can access the deployed application [here](https://luminous-dodol-6a5328.netlify.app/).