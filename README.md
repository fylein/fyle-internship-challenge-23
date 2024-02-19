## 🔗 Link
[github repo fetcher]()

### Install requirements
* Install angular cli [Ref](https://angular.io/cli)
* `npm install` in this repository 

## Development server

Run `ng serve` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Further help

Visit the [Angular Documentation](https://angular.io/guide/styleguide) to learn more.
Styling is to be strictly done with [Tailwind](https://tailwindcss.com/docs/installation).

## Project Structure

    .
    └── src/
        └── app/
            ├── search-bar/
            ├── repo/
            ├── usercard/
            ├── state/
            └── services/


## Running Tests

## Note 

If you are using Chrome install karma-chrome-launcher and update the karma.conf.js plugins with karma-chrome-launcher. example: plugins:[ require('karma-chrome-launcher')] 
and add "Chorme" in browsers. example: browsers:['Chrome']

To run tests, run the following command

i have choosen search-bar.component.ts and api.service.ts for testing

```bash
  ng test --include=src/app/search-bar/search-bar.component.spec.ts --code-coverage

```
```bash
  ng test --include=src/app/sevices/api.service.spec.ts --code-coverage

```

