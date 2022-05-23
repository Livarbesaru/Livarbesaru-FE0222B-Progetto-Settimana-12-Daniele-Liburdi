import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.guard';
import { FormModuleGuard } from './auth/form-module-guard.guard';


const routes: Routes = [
  {
    canActivateChild:[AuthGuard],
    path: '',
    loadChildren: () => import('./components/movies-list/movie-list.module').then(m => m.MovieListModule)
  },
  {
    canActivateChild:[AuthGuard],
    path: 'dettailmovie/:id',
    loadChildren: () => import('./components/dettail-movie/dettail-movie.module').then(m => m.DettailMovieModule)
  },
  {
    canActivateChild:[AuthGuard],
    path: 'profile',
    loadChildren: () => import('./components/profilo/profilo.module').then(m => m.ProfiloModule)
  },
  {
    canActivateChild:[FormModuleGuard],
    path: 'signup',
    loadChildren: () => import('./auth/components/signup/signup.module').then(m => m.SignUpModule)
  },
  {
    canActivateChild:[FormModuleGuard],
    path: 'login',
    loadChildren: () => import('./auth/components/login/login.module').then(m => m.LoginModule)
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
