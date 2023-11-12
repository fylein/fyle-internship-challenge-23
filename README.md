
# GitHub Repo Lister
List all repositories of a GitHub user
![App Screenshot](https://repo-lister.s3.ap-south-1.amazonaws.com/angular+page.jpeg)

## Links
[![App Link](https://img.shields.io/badge/Link-000?style=for-the-badge&logo=ko-fi&logoColor=white)](http://repo-lister.s3-website.ap-south-1.amazonaws.com/)


## Tech Stack

* **Frontend:** Angular, Typescript, TailwindCSS

* **Backend:** GitHub REST API

* **Libraries:** Angular Material, ngx-ui-loader



## Run Locally

Clone the project

```bash
  git clone https://github.com/nay-22/GitHub-Repo-Lister.git
```

Go to the project directory

```bash
  cd GitHub-Repo-Lister
```

Install dependencies

```bash
  npm install
```

```bash
  npm install --save ngx-ui-loader
```

```bash
  ng add @angular/material
```

Start the server

```bash
  ng serve -o
```

## Running Tests

**Unit Tests For 1 Component and 1 Service with 100% code coverage**
* *Component*: **UserDetailComponent** - should accept type **User** from its parent component
* *Service*: **ApiService** - 
    * should return an Observable<User>
    * should return an **Observable<Repo[]>**

To run tests
```bash
  ng test
```
![App Screenshot](https://repo-lister.s3.ap-south-1.amazonaws.com/angular+test.jpeg)

## Deployment

App deployed on static-hosting-enabled Amazon S3 bucket


