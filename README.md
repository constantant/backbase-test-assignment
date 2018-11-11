# Backbase Test Assignment

- The application is written with Angular 7 which is most appropriate for such a task.
- There is no difference between dev and prod versions but it is easy to implement into [api.interceptor.ts](src/app/shared/api.interceptor.ts).
- Due to Angular Material, some parts of the app can have a bit different appearance than on the design picture.
- The description says that we need a confirm step on the Make a Transfer form. I've decided to use [MatStepper](https://material.angular.io/components/stepper/overview), seems it fits good there. 
- On the mobile view the Make a Transfer form is hidden with [Dialog](https://material.angular.io/components/dialog/overview) window which can be called by the bottom orange button.
- Some unit tests were added `ng test`

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
