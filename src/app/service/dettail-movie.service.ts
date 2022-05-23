import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movies } from '../interface/movies';

@Injectable({
  providedIn: 'root'
})
export class DettailMovieService {

  BaseUrl:string='http://localhost:4201'

  constructor(private http:HttpClient) { }

  getMovie(id:number){
    return this.http.get<Movies>(this.BaseUrl+'/movies-popular/'+id)
  }

  getMovie2(id:number){
    return this.http.get<Movies>(this.BaseUrl+'/movies-toprated/'+id)
  }
}
