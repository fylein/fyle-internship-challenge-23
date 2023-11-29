# FyleProject
## Fyle Frontend Internship Challenge
## Techstack used:
1) Angular 13.x
2) Libraries - Angular Material, ngxPagination
3) CSS framework - Tailwind

## Description of the Project
1) Made 6 components, the first one is front-searching component where there is form group to enter the name of person and then a search button so that user will be able to search the repo.
2) The second component is error component that is to return the error message to the user if the repository do not exist or person not found
3) The Third component is loading component where mat-spinner loading criteria is used so whenever the user will search the repo it will automatially comes into action.
4) The fourth component is person-details, so this is the first page that will be visible to user once he/she will click the search button
5) The fifth component that I used is person-repositories where I have applied pagination through pagination controls so that user can navigate through various pages of repositories
6) The last component that I made is single-repo that is to show the single repositores of the particular user in the card view

## Running locally
1) Create a environment.testing.ts file in the environments directory, And export your Github personal access token from inside of it.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
