# Fyle Frontend Challenge

#### Live on URL

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
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   ├── app.module.ts
│   ├── app.server.module.ts
│   ├── components
│   │   ├── error
│   │   │   ├── error.component.html
│   │   │   ├── error.component.scss
│   │   │   ├── error.component.spec.ts
│   │   │   └── error.component.ts
│   │   ├── loading
│   │   │   ├── loading.component.html
│   │   │   ├── loading.component.scss
│   │   │   ├── loading.component.spec.ts
│   │   │   └── loading.component.ts
│   │   ├── navigation
│   │   │   ├── navigation.component.html
│   │   │   ├── navigation.component.scss
│   │   │   ├── navigation.component.spec.ts
│   │   │   └── navigation.component.ts
│   │   ├── repos
│   │   │   ├── repos.component.html
│   │   │   ├── repos.component.scss
│   │   │   ├── repos.component.spec.ts
│   │   │   └── repos.component.ts
│   │   ├── search-user
│   │   │   ├── search-user.component.html
│   │   │   ├── search-user.component.scss
│   │   │   ├── search-user.component.spec.ts
│   │   │   └── search-user.component.ts
│   │   └── user-bio
│   │       ├── user-bio.component.html
│   │       ├── user-bio.component.scss
│   │       ├── user-bio.component.spec.ts
│   │       └── user-bio.component.ts
│   ├── services
│   │   ├── api
│   │   │   ├── api.service.spec.ts
│   │   │   └── api.service.ts
│   │   ├── cache
│   │   │   ├── cache.service.spec.ts
│   │   │   └── cache.service.ts
│   │   └── polling
│   │       ├── polling.service.spec.ts
│   │       └── polling.service.ts
│   └── store
│       ├── actions.ts
│       ├── effects.ts
│       ├── reducers.ts
│       ├── selectors.ts
│       └── state.ts

```

## Further help

Visit the [Angular Documentation](https://angular.io/guide/styleguide) to learn more.
Styling is to be strictly done with [Tailwind](https://tailwindcss.com/docs/installation).
