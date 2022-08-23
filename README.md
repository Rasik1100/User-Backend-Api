# User Authentication API

# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 16.16.0
- Install [MySQL](https://www.mysql.com/) version 8.0.30


# Getting started
- Clone the repository
```
git clone  <github repo url> 
```
- Install dependencies
```
cd <project_name>
npm install
```
- Build and run the project
```
npm start
```
  Navigate to `http://localhost:8080`


## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **config**                 | Contains the MySQL database configuration for Different Node Environment    |
| **node_modules**         | Contains all  npm dependencies                                                            |
| **src**                  | Contains  source code that will be compiled to the dist dir                               |
| **src/controllers**      | Controllers define functions to serve various express routes. 
| **src/middlewares**      | Express middlewares which process the incoming requests before handling them down to the routes
| **src/routes**           | Contain all express routes, separated by module/area of application                       
| **models**           | Models define schemas that will be used in storing and retrieving data from Application database  |
| **Procfile**         | Helper file for heroku deployment
| **src/app.ts**         | Entry point to express app                                                               |
| **package.json**             | Contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)   | tsconfig.json            | Config settings for compiling source code only written in TypeScript    


### Running the build

| Npm Script | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `start`                   | Runs full build and runs node on dist/index.js. Can be invoked with `npm start`                  |

### API End Point
| End Point | Method Type | Request Body | Description |
| ------------------------- | ------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------- |
| **/signUp**       | POST  | ```{email:'test@123',password:'test',name:'test'}``` | for Creating a new user
| **/login**       | POST  | ```{email:'test@123',password:'test'}``` | for getting a JWT Token
| **/validateToken**  | GET       | Pass Token in Request Header | To Validate JWT Token

