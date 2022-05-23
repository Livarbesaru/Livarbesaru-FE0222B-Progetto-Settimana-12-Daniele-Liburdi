import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth-guard.guard';
import { DettailMovieComponent } from './dettail-movie.component';


const routes: Routes = [
  {
  path: '',
  component:DettailMovieComponent,
  canActivate:[AuthGuard]
}
];

@NgModule({
  declarations:[
    DettailMovieComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class DettailMovieRoutingModule { }
