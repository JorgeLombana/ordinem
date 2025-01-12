import { Routes } from '@angular/router';
import { HomeComponent } from '@components/home/home.component';
import { LayoutComponent } from '@components/layout/layout.component';
import { LoginComponent } from '@components/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: 'todo-list',
        loadComponent: () =>
          //instead of declaring the component, this lazily loads the component
          import('@components/todo-list/todo-list.component').then(
            (c) => c.TodoListComponent
          ),
      },
      { path: '', component: HomeComponent, pathMatch: 'full' }, //to redirect when the url is void (myapp.com/)
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'login',
    loadComponent: () =>
      import('@components/login/login.component').then((c) => c.LoginComponent),
  },
  { path: '**', redirectTo: 'home' }, // '**' this is a wildcard that will 'catch-all' in the url (myapp.com/something)
];
