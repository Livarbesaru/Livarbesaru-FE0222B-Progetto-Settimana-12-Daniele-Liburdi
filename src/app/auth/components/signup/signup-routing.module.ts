import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormModuleGuard } from '../../form-module-guard.guard';
import { SignupComponent } from './signup.component';

const routes: Routes = [
  {
  path: '',
  component:SignupComponent,
  canActivate:[FormModuleGuard]
}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class SignUpRoutingModule { }
