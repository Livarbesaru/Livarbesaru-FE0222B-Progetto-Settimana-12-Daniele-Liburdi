import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth-guard.guard';
import { MoviesListComponent } from './movies-list.component';


const routes: Routes = [
  {
  canActivate:[AuthGuard],
  path: '',
  component:MoviesListComponent
}
];

@NgModule({
  declarations:[
    MoviesListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class MovieListRoutingModule { }
