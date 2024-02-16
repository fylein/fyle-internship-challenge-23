# Fyle Frontend Challenge

#### Live Demo: https://fyle-internship-challenge-23-ruby.vercel.app/

### Prerequisites

- Install angular cli [Ref](https://angular.io/cli)

## Installation

1. Clone the forked repository
2. In *package.json*, replace the **build** command with **ng build**(The config.js was configured for deployment, ignore that)
3. Proceed with the following

### Docs on Testing

1. Make sure you have installed angular cli.
2. After cloning this repo, run ```npm i``` to install all packages.
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

## Technology Used

Designed with Angular and TailwindCSS 
Visit the [Angular Documentation](https://angular.io/guide/styleguide) to learn more.

## Contribution

Don't forget to star this repo if you like it , to add more features feel free to fork and customise it! 

# Screens
Checkout https://imgur.com/a/13QqRND for the visual designs.
