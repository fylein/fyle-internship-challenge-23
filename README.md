# Fyle Frontend Challenge

#### Live on URL -> https://fyle-internship-challenge-23-ruby.vercel.app/

### Prerequsites

- Install angular cli [Ref](https://angular.io/cli)

## Installation

Clone the forked repository and proceed with steps mentioned below

### Docs on Testing

1. Make sure you have installed angular cli.
2. After Clonng this repo, run npm i to install all packages.
3. Run the following commands(from project's root) to generate test results for "App.component.ts" & "api.service.ts"

```
 ng test --main 'src/app/app.component.spec.ts --code-coverage'

 ng test --main 'src/app/services/api/api.service.spec.ts --code-coverage'
```

4. Headover to _coverage/fyle-frontend-challenge_ (from project's root) and you'll find index.html to check the status of test coverage of every component,service etc.. (I had chosen App.component and api.service).
5. Cheers

### Development server

Run `ng serve` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

### Structure of the project

```
src
├── app
   |
   ├── components
   │   ├── error
   │   │  
   │   ├── loading
   │   │  
   │   ├── navigation
   │   │  
   │   ├── repos
   │   │  
   │   ├── search-user
   │   │  
   │   └── user-bio
   │  
   ├── services
   │   ├── api
   │   │  
   │   ├── cache
   │   │  
   │   └── polling
   │  
   └── store
       ├── actions.ts
       ├── effects.ts
       ├── reducers.ts
       ├── selectors.ts
       └── state.ts

```

## Further help

Visit the [Angular Documentation](https://angular.io/guide/styleguide) to learn more.
Styling is to be strictly done with [Tailwind](https://tailwindcss.com/docs/installation).
