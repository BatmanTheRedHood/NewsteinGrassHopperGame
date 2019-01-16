# NokiaSnake

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

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

ng g c components/freeLancerPage/profileBlocks/projectImages --module=app --spec=false

ng g module app --routing=true --routingScope=Root --flat=true --spec=false --module=app


## Routing
<base href="/">

# Router Outlet
<router-outlet></router-outlet>
<!-- Routed components go here -->

# Router link
<h1>Angular Router</h1>
<nav>
  <a routerLink="/crisis-center" routerLinkActive="active">Crisis Center</a>
  <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
</nav>
<router-outlet></router-outlet>

# Define a Wildcard route
{ path: '**', component: PageNotFoundComponent }

# Full match
const appRoutes: Routes = [
  { path: 'crisis-center', component: CrisisListComponent },
  { path: 'heroes',        component: HeroListComponent },
  { path: '',   redirectTo: '/heroes', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

# Route definition with a parameter
{ path: 'hero/:id', component: HeroDetailComponent }  
localhost:4200/hero/15

The router extracts the route parameter (id:15) from the URL and supplies it to Component via the ActivatedRoute service.

# Activated Route in action
constructor(
  private route: ActivatedRoute,
  private router: Router
) {}

ngOnInit() {
  let id = this.route.snapshot.paramMap.get('id');

  this.hero$ = this.service.getHero(id);
}

gotoHeroes() {
  this.router.navigate(['/heroes']);
}

