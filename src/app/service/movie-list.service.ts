import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Favorites } from '../interface/favorites';
import { Genres } from '../interface/genres';
import { Movies } from '../interface/movies';

@Injectable({
  providedIn: 'root'
})
export class MovieListService {

  BaseUrl:string='http://localhost:4201'

  constructor(private http:HttpClient) { }

  getMoviesPopular(){
   return this.http.get<Movies[]>(this.BaseUrl+'/movies-popular')
  }
  getMoviesTopRated(){
    return this.http.get<Movies[]>(this.BaseUrl+'/movies-toprated')
  }

  getGenres(){
    return this.http.get<Genres[]>(this.BaseUrl+'/genres')
  }

  getFavorites(){
    return this.http.get<Favorites[]>(this.BaseUrl+'/favorites')
  }

  postFavorites(data:Favorites){
    return this.http.post<Favorites[]>('http://localhost:4201/favorites',data)
  }

  removeFavoritedata(id:number){
    return this.http.delete<Favorites[]>('http://localhost:4201/favorites'+'/'+id)

  }
}
