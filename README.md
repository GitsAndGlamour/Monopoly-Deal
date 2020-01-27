# Monopoly Deal Card Game

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `public/` directory. Use the `--prod` flag for a production build. I have changed the output folders from `dist/` to `public/` for Firebase deployments. If you do not wish to do that, you can change the firebase settings instead. In your `firebase.json` file, there is a section titled **hosting** that you can specify the "public" location. It is set to `public` by default. 

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Firebase Setup
Run `firebase init` and choose [hosting](), [firestore](), and [functions]() options in the provided CLI prompt. If you don't have a project setup on Firebase, [set one up here](https://console.firebase.google.com/u/2/), or follow along the CLI prompts to set one up. If you don't have firebase installed globally do so with: 
`npm install -g firebase firebase-tools`
Don't forget to set up the application as a single-page application. This is not the default setting for the application.

## Firebase Authentication
Activate Authentication in your project by going to:
`https://console.firebase.google.com/u/2/project/${YOUR-PROJECT-NAME}/authentication/users`
(Don't forget to enable e-mail validation!)

## Firestore Setup
Activate Firestore in your project by going to:
`https://console.firebase.google.com/u/2/project/${YOUR-PROJECT-NAME}/database/firestore/data~2F`

## Hosting
To deploy an application to Firebase, enable hosting by following the setup steps in the link below:
`https://console.firebase.google.com/u/2/project/${YOUR-RPOJECT-NAME}/hosting`

## Deploy
Run `firebase deploy` to deploy to Firebase.

## Cloud Functions
Next to be added.

## Google Cloud Build CI/CD
Soon to be added.
