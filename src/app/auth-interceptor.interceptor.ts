import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable, switchMap , take } from 'rxjs';
import { AuthService } from './auth/auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private AuthSrv:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.AuthSrv.account$.pipe(take(1),switchMap(user=>{
      if(!user){
        return next.handle(request);
      }
      else{
        const newReq=request.clone({
          headers:request.headers.set(
            'Authorization',`Bearer ${user?.accessToken}`
          )
        })
        return next.handle(newReq);
      }
    }))
  }
}
