import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth-service.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form!: FormGroup;


  constructor(private FormBuilder: FormBuilder, private AuthSrv:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.form =
    this.FormBuilder.group({
      utente: this.FormBuilder.group({
        email: this.FormBuilder.control(null, [
          Validators.required,
          Validators.email,
        ]),
        password: this.FormBuilder.control(null, [
          Validators.required,
          Validators.minLength(8),
        ]),
        username: this.FormBuilder.control(null, [
          Validators.required,
          Validators.minLength(4)
        ]),
      }),
    });
  }

  controlloType(tipo: string) {
    return this.form.get(tipo);
  }
  errorType(tipo: string, error: string) {
    return this.form.get(tipo)?.errors![error];
  }

  submitRegi(form:any){
    this.AuthSrv.submitRegistration(form.value.utente).subscribe(
      (ris)=>{
        console.log(ris)
      }
    )
  }
}
