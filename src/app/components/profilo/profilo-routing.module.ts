import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProfiloComponent } from './profilo.component';
import { AuthGuard } from 'src/app/auth/auth-guard.guard';


const routes: Routes = [
  {
  path: '',
  component:ProfiloComponent,
  canActivate:[AuthGuard]
}
];

@NgModule({
  declarations:[
    ProfiloComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class ProfiloRoutingModule { }
