Deployed website: https://githubuser-repo-search.netlify.app/

Step 1:
  The getUser method has been modified to include a caching mechanism using the RxJS shareReplay operator, which helps in avoiding unnecessary API calls by storing and reusing the observable for a given username. Additionally, error handling has been improved by utilizing the catchError operator to handle API request errors and remove the corresponding entry from the cache in case of failure.

Furthermore, a new method getRepos has been implemented to retrieve repositories for a given GitHub user. This method takes additional parameters for pagination, namely page and pageSize, and constructs the API URL accordingly. The return type of the getRepos method has been specified as an observable of an array of any type.

step 2;
   Three Angular components were created to complement the updated ApiService. The UserDetailsComponent was designed to display detailed information about a GitHub user, utilizing the ApiService to fetch user data. The component subscribes to route parameter changes to dynamically update the displayed user details based on the selected username.

The SearchComponent was implemented to provide a user-friendly search interface. It takes user input for a GitHub username and uses the Angular Router to navigate to the UserDetailsComponent with the specified username as a route parameter.

Lastly, the RepositoryListComponent was introduced to display a list of repositories for a given GitHub user. This component interacts with the getRepos method from the ApiService to retrieve and showcase the repositories. Pagination parameters like page and pageSize can be adjusted to manage the number of repositories displayed per page.

These components work together to create a cohesive Angular application, allowing users to search for GitHub profiles, view detailed user information, and explore repositories associated with a particular user.

step 3: 
   
In the SearchComponent, an Angular reactive form was implemented to enhance user input handling. The HTML template contains a form element bound to the searchForm FormGroup, which includes a single FormControl for the GitHub username input. The form is set up to emit the ngSubmit event, triggering the search() method when the user submits the form.

The TypeScript file (search.component.ts) defines the SearchComponent class, which utilizes the Angular FormBuilder to create the searchForm FormGroup. This FormGroup encapsulates the username input field. The search() method is responsible for extracting the entered username from the form and emitting it through the searchUsername EventEmitter, making it accessible to the parent component or any listeners.

By employing a reactive form approach, this implementation promotes cleaner code, improved maintainability, and better integration with Angular's form-related features. The emitted username can be utilized by parent components or services to initiate actions such as fetching user data or updating the application state.

step 4:
In the UserDetailsComponent, an Angular component was crafted to visually represent detailed information about a GitHub user. The HTML template utilizes Angular's structural directives, such as *ngIf, to conditionally render sections based on the availability of specific user attributes. The user details are presented within a flexbox container, enhancing layout and visual appeal.

The template dynamically displays the user's avatar, name, bio, location, Twitter handle (if available), and blog link (if provided). The Twitter handle is presented as a clickable link to the user's Twitter profile, and the blog link, if available, directs users to the specified URL.

The TypeScript file (user-details.component.ts) defines the UserDetailsComponent class, which features an @Input() decorator to receive the user object from the parent component or service. This component operates as a pure presentation component, responsible solely for rendering the user details based on the provided input.

The combination of HTML and TypeScript in this component ensures a clear separation of concerns, following Angular best practices and promoting reusability. The use of Angular's Input decorator facilitates communication between components, allowing for the seamless integration of user details into the application's user interface.


step 5:
In the RepositoryListComponent, an Angular component was developed to present a list of repositories in a visually appealing grid layout. The HTML template utilizes Angular's structural directives, such as *ngFor, to dynamically iterate over the displayedRepositories array, presenting each repository's name, description, and programming language in individual cards. The layout is enhanced by applying CSS classes for styling and responsiveness.

The component also includes sections for handling loading and error states, providing user feedback during data retrieval. If repositories are still loading, a "Loading..." message is displayed, and in case of an error, an "Error loading repositories" message is presented.

The pagination functionality allows users to navigate through multiple pages of repositories. It includes navigation buttons for moving to the previous or next page and a series of clickable page numbers. The page numbers are dynamically generated based on the total number of repositories and the specified number of items per page (in this case, six).

The TypeScript file (repository-list.component.ts) defines the RepositoryListComponent class, which receives repository data, loading, and error flags as inputs. The class includes methods for handling pagination, calculating total items and pages, and fetching the subset of repositories to be displayed based on the current page.

This component serves as a self-contained module, offering flexibility for integration into different parts of the application that require repository listing functionality. It effectively combines HTML template logic with TypeScript functionality to create a user-friendly and dynamic repository list component.

step 6:
In the AppComponent of your Angular application, a cohesive structure has been established to integrate the search, user details, and repository list components. The HTML template (app.component.html) reflects a minimalistic design with a flex container, ensuring a responsive and organized layout for the application.

The AppComponent TypeScript file (app.component.ts) is well-organized, featuring an efficient implementation of the onSearch method. This method is triggered when the searchUsername event is emitted from the SearchComponent. The method initiates API calls through the ApiService to retrieve user details and repositories based on the provided username. Loading flags are appropriately managed to provide user feedback during data retrieval, and error handling is in place to manage potential API call failures.

The application module (app.module.ts) is effectively configured with the necessary imports, including BrowserModule, HttpClientModule for HTTP requests, and ReactiveFormsModule for working with reactive forms. The components, SearchComponent, RepositoryListComponent, and UserDetailsComponent, are declared within the module, establishing a clear module structure.

Overall, the code demonstrates a well-structured Angular application with effective communication between components, proper organization of services, and a clean module setup. The use of reactive forms and Angular's HttpClientModule further enhances the application's functionality and maintainability.

