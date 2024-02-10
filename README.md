# Fyle Frontend Challenge - GitHub Repositories Listing Page
---

## Objective
---

The objective of this challenge is to create a GitHub repositories listing page using Angular.

## Description
---

This Angular single-page application (SPA) allows users to search for a GitHub username and displays the public repositories belonging to that user. It implements pagination, server-side rendering, and error handling for a seamless user experience.

## Features
---

- **Search Functionality**: Users can enter a GitHub username in the search bar and click the search button to view the corresponding repositories.
- **Pagination**: Pagination is implemented on the server-side, allowing users to navigate through large lists of repositories efficiently. Users can select the number of repositories to display per page.
- **Loading Indicators**: Loading are displayed while fetching data from the GitHub API to indicate loading progress.
- **Error Handling**: In case the user is not found or an error occurs during API requests, a zero-state message is displayed to inform the user.
- **Caching**: GET API calls to external APIs are cached to avoid making duplicate requests, providing faster loading times.

## Project Structure
---

- **src/app**: Contains the Angular application files.
    - **app.component.ts**: Root component of the application.
    - **app.component.html**: HTML template for the root component.
    - **app.module.ts**: Angular module where components and services are declared.
    - **main-body**: Directory containing the main component for displaying user repositories.
        - **main-body.component.ts**: Component logic for displaying user repositories.
        - **main-body.component.html**: HTML template for displaying user repositories.
        - **main-body.component.scss**: Styling specific to the main component.
    - **services**: Directory containing services for API communication.
        - **api.service.ts**: Service for making API requests to fetch user data and repositories.
        - **mock-data**: Directory containing mock data for testing.
            - **users.ts**: Mock user data for testing API requests.

## Usage
---

1. Clone the repository: git clone <repository-url>
2. Install dependencies: npm install
3. Run the application: ng serve
4. Open the application in your browser: http://localhost:4200

## Testing
---

Unit tests for the API service are provided to ensure the correctness of API requests and responses. The tests utilize Angular's testing utilities along with HttpClientTestingModule for mocking HTTP requests.

To run the tests, run the following command: ng test

## Deployment
---

The application is hosted on [Netlify](https://www.netlify.com/) using the following URL: [GitHub Repositories Listing Page](https://65c68372a17511073086e47e--whimsical-brioche-176804.netlify.app/).

## Credits
---

This project was developed as part of the Fyle Internship Challenge on Internshala. The original challenge prompt and requirements were provided by Fyle.