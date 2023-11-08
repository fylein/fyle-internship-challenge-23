# Fyle Frontend development challenge
Challenge outline: Github Repositories listing page

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Running Unit Tests](#running-unit-tests)
- [Assumptions](#assumptions)
- [External Packages Used](#external-packages-used)

## Prerequisites

Before running the application and unit tests, make sure you have the following prerequisites installed on your system:

- [Node.js](https://nodejs.org/): The runtime environment for running Angular applications.
- [Angular CLI](https://angular.io/cli): The command-line interface for Angular applications.

## Installation

1. Clone the GitHub repository to your local machine:

   ```
   git clone https://github.com/dontdude/fyle-internship-challenge-23.git
   ```

2. Navigate to the project's root directory:

   ```
   cd fyle-internship-challenge-23
   ```

3. Install the project dependencies using npm:

   ```
   npm install
   ```

## Running the Application

To run the GitHub User Search Application, follow these steps:

1. Ensure you have completed the installation steps as mentioned above.

2. Open a terminal and navigate to the project's root directory if you're not already there.

3. Run the following command to start the application:

   ```
   ng serve
   ```

4. The application should now be running locally. Open your web browser and access the app at `http://localhost:4200/`.

## Running Unit Tests

The assignment requires unit tests with 100% code coverage for at least one component and one service. To run the unit tests, use the following commands:

1. For the component unit test:

   ```
   ng test --include=**/app.component.spec.ts
   ```

2. For the service unit test:

   ```
   ng test --include=**/api.service.spec.ts
   ```

Ensure that your unit tests achieve 100% code coverage, and you can view the code coverage report after running the tests.

## Assumptions

Please note the following assumptions made during the development of this assignment:

- The assignment focuses on searching for GitHub users, displaying user details, and listing their repositories.
- The application assumes an internet connection is available to fetch data from the GitHub API.
- The application uses Angular as the framework for the front-end development.

## External Packages Used

The assignment uses the following external packages to enhance functionality and development:

- [NgxPaginationModule](https://www.npmjs.com/package/ngx-pagination): Used for implementing pagination in the user repositories list.
- [NgxSkeletonLoaderModule](https://www.npmjs.com/package/ngx-skeleton-loader): Used for providing skeleton loading animations to improve the user experience.

Please make sure to install these packages during the installation process, as mentioned above.

For more information or any assistance, please contact [Your Name or Contact Information].
```

You can use this Markdown code as the content of your README.md file in your project.
