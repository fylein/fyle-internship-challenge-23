# Repo Fetch

This is a simple web application for easily discovering and accessing public repositories of a GitHub user.
## Features :

- The home page has a search bar where users can enter the GitHub username they want to search for.
- The search results page displays a list of public repositories associated with the entered GitHub username. Each repository has a link to its GitHub page, and some basic information like the number of stars, languages, etc.

## Tech Used :
 
 - ![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white) 
 - ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
      
## Project Structure :

```
src
 └── app
      |
      ├── footer
      | 
      ├── header
      |
      ├── main-geist
      │   │  
      |   ├── invalid-user-profile
      │   │  
      |   ├── user-github-profile
      │   │  
      |   ├── user-input
      │   │  
      |   ├── user-repo-list
      │   │  
      |   ├── util-pagination
      │   │
      |   ├── util-user-profile-loader
      │   │  
      |   └── util-user-repo-loader
      |
      ├── models
      |
      └── services
```

## How to Setup :

1. Install [Angular CLI](https://angular.io/cli).
2. Fork this repository to your github account.
3. Clone the forked repository in your local machine.
4. Run `npm install` or `npm i` in this repository. This will install all the required packages and dependencies to run the application.
5. To start the development server, run `ng serve`. At this point, the application is ready to use. Navigate to http://localhost:4200/.

## Running Tests :

- Before running the tests, please ensure you have installed the project dependencies using `npm install` or `npm i`.
- To run tests using the Angular CLI, use `ng test`. This command will initiate the Karma Test Runner in your default web browser and run all the unit tests in the application.

Here are thr unit tests for this project :

- For Entire Application -

![Screenshot 2024-02-17 132319](https://github.com/sarveshpyadav/Repo-Fetcher/assets/127607339/6e2318d1-be00-4315-a009-72c629260b79)

- For `User Input` Component -

![Screenshot 2024-02-17 132059](https://github.com/sarveshpyadav/Repo-Fetcher/assets/127607339/9f7b6f5a-570c-4d97-8c97-44c6be598c58)

- For `API Service` -

![Screenshot 2024-02-17 173317](https://github.com/sarveshpyadav/Repo-Fetcher/assets/127607339/a380c511-e0dd-49d6-82d1-76b2c776a07d)

#
>**_NOTE :_** I have built this project as a part of Fyle Frontend Challenge 2023.
>
