import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { Movies } from 'src/app/interface/movies';
import { DettailMovieService } from 'src/app/service/dettail-movie.service';

@Component({
  selector: 'app-dettail-movie',
  templateUrl: './dettail-movie.component.html',
  styleUrls: ['./dettail-movie.component.scss']
})
export class DettailMovieComponent implements OnInit {
  sub!:Subscription
  id!:number
  movie!:Movies

  constructor(private router:ActivatedRoute,private DetMovie:DettailMovieService, private http:HttpClient) { }

  ngOnInit(): void {
    this.sub = this.router.params.subscribe((params: Params) =>{
      this.id = +params['id'];
    });
    this.movieSub()
    if(this.movie==undefined){
      this.movieSub2()
    }
  }

  movieSub(){
    return this.DetMovie.getMovie(this.id).subscribe((product)=>{
        this.movie=product
    })
  }

  movieSub2(){
    return this.DetMovie.getMovie2(this.id).subscribe((product)=>{
      this.movie=product
  })
  }

  ngOnDestroy(){
    this.movieSub().unsubscribe()
    this.movieSub2().unsubscribe()
  }

}
