import { HttpClient } from '@angular/common/http';
import { Component, OnInit ,OnDestroy} from '@angular/core';
import { Movies } from 'src/app/interface/movies';
import { MovieListService } from 'src/app/service/movie-list.service';
import { BehaviorSubject, catchError, concat, map , Subscription, tap} from 'rxjs';
import { Genres } from 'src/app/interface/genres';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth-service.service';
import { Favorites } from 'src/app/interface/favorites';

@Component({
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  constructor(private http:HttpClient,private MovieSrv:MovieListService, private router:Router,private AuthSrv:AuthService) { }

  movieArray:Movies[]=[]
  genres:Genres[]=[]
  valuechoice=new BehaviorSubject<null|'string'>(null)
  account$=this.valuechoice.asObservable()
  isLoggedIn$=this.account$.pipe(map((choice)=>!!choice))
  errorMessage!:boolean
  user!:{id: number; email: string; name: string; username: string;}
  favorites:Favorites[]=[]
  sub!:Subscription
  stop:boolean=false

  ngOnInit(): void {
    this.loadAllfilm()
    this.loadGenre()
    this.AuthSrv.account$.subscribe((islogged)=>{
      console.log(islogged)
      if(islogged?.user!=null){
        console.log(islogged.user)
      this.user=islogged?.user
      }
    })

    this.MovieSrv.getFavorites().pipe(tap((fav)=>{
      console.log(fav)
      this.favorites=fav
      this.favorites=this.favorites.filter(x=>x.userId==this.user.id)
      console.log(this.favorites)
    })).subscribe()

  }

  ngOnDestroy(){
    this.onlyPopular().unsubscribe()
    this.onlyRated().unsubscribe()
    this.loadFilmPopular().unsubscribe()
    this.loadFilmMostRated().unsubscribe()
  }

  loadAllfilm(){
    this.loadFilmPopular()
    this.loadFilmMostRated()
  }

  loadFilmPopular(){
   return this.MovieSrv.getMoviesPopular().pipe(tap((movies)=>{
      this.movieArray=movies
    })).subscribe()
  }

  loadFilmMostRated(){
    return this.MovieSrv.getMoviesTopRated().pipe(tap((movies2)=>{
      this.movieArray=this.movieArray.concat(movies2)
    })).subscribe()
  }

  onlyRated(){
    return this.MovieSrv.getMoviesTopRated().pipe(tap((movies2)=>{
      this.movieArray=movies2
    })).subscribe()
  }

  onlyPopular(){
    return this.MovieSrv.getMoviesPopular().pipe(tap((movies)=>{
       this.movieArray=movies
    })).subscribe()
  }



  loadGenre(){
    return this.MovieSrv.getGenres().pipe(tap((genres)=>{
     this.genres=genres
     console.log(this.genres)
     console.log(this.movieArray)
   })).subscribe()
  }

 async filter(){

    let select1=(<HTMLInputElement>document.getElementById('type1')).value;
    let select2=(<HTMLInputElement>document.getElementById('type2')).value;
    let select3=(<HTMLInputElement>document.getElementById('type3')).value;
    let select4=(<HTMLInputElement>document.getElementById('type4')).value;
    let select5=(<HTMLInputElement>document.getElementById('type5')).value;

    if(select1.trim()!=''&& select1!=null){
      console.log('primo')
      this.scanFilm(select1)
    }
    if(select2.trim()!=''&& select2!=null){
      console.log('secondo')
      this.scanFilm(select2)
    }
    if(select3.trim()!=''&& select3!=null){
      console.log('terzo')
      this.scanFilm(select3)
    }
    if(select4.trim()!=''&& select4!=null){
      console.log('quarto')
      this.scanFilm(select4)
    }
    if(select5.trim()!=''&& select5!=null){
      console.log('quinto')
      this.scanFilm(select5)
    }
  }

 async scanFilm(genre:string){
  await new Promise<Genres>(()=>{
    let numberIndx =this.genres.findIndex((item)=>item.name==genre)
    let genreIndx =this.genres[numberIndx].id
      let movieTemporal=this.movieArray.filter(x=>x.genre_ids.includes(genreIndx))
      if(movieTemporal.length>=1){
        this.movieArray=movieTemporal
        this.errorMessage=false
      }
      else{
        this.errorMessage=true
      }
    })
  }

  tempo(){
    this.stop=true
    setTimeout(()=>{
      this.stop=false
    },1500)
  }

  dettailMovie(id:number){
    this.router.navigate(['/'])
    this.router.navigate(['/dettailmovie',id])
  }

  resetFilter(){
    (<HTMLInputElement>document.getElementById('type1')).value='';
    (<HTMLInputElement>document.getElementById('type2')).value='';
    (<HTMLInputElement>document.getElementById('type3')).value='';
    (<HTMLInputElement>document.getElementById('type4')).value='';
    (<HTMLInputElement>document.getElementById('type5')).value='';
    this.onlyPopular().unsubscribe()
    this.onlyRated().unsubscribe()
    this.loadAllfilm()
    this.loadFilmPopular().unsubscribe()
    this.loadFilmMostRated().unsubscribe()
    this.errorMessage=false
  }

  sortByMostpopular(){
    this.movieArray.sort((a,b)=>{
      return a.vote_count-b.vote_count
    })
  }
  sortByMostRated(){
    this.movieArray.sort((a,b)=>{
      return a.vote_average-b.vote_average
    })
  }

  findFav(id:number){
    if(this.favorites.findIndex(x=>x.movieId===id)===-1){
      return true
    }
    else if(this.favorites.findIndex(x=>x.movieId===id)>=0){
      return false
    }
    else{
      return true
    }
  }

  postFavorite(idFilm:number){
    this.tempo()
    console.log(this.favorites)
    this.MovieSrv.getFavorites().pipe(tap((fav)=>{
      console.log(fav)
      this.favorites=fav
      this.favorites=this.favorites.filter(x=>x.userId==this.user.id)
      console.log(this.favorites)
    })).subscribe()

    if(this.favorites.length>0){
      if(this.favorites.findIndex(x=>x.movieId==idFilm)>=0){
        let indxFilm=this.favorites.findIndex(x=>x.movieId==idFilm)
        this.sub=this.MovieSrv.removeFavoritedata(this.favorites[indxFilm].id).subscribe()
      }
      else if(this.favorites.findIndex(x=>x.movieId==idFilm)===-1){
        let indexFilm=this.favorites[(this.favorites.length-1)].id
        indexFilm = indexFilm === undefined ? 0 : indexFilm;
        console.log(indexFilm)
        this.sub=this.MovieSrv.postFavorites(<Favorites>{id:(indexFilm+1),movieId:idFilm,userId:this.user.id}).subscribe()
      }
    }

    else if(this.favorites.length===0){
      this.sub=this.MovieSrv.getFavorites().pipe(tap((fav)=>{
        console.log(fav)
        this.favorites=fav
        console.log(this.favorites)
      })).subscribe()

      if(this.favorites.length===0){
        let indexFilm=0
        console.log(indexFilm)
        this.sub=this.MovieSrv.postFavorites(<Favorites>{id:(indexFilm+1),movieId:idFilm,userId:this.user.id}).subscribe()
      }
      else{
        let indexFilm=this.favorites[(this.favorites.length-1)].id
        console.log(indexFilm)
        this.sub=this.MovieSrv.postFavorites(<Favorites>{id:(indexFilm+1),movieId:idFilm,userId:this.user.id}).subscribe()
      }
    }
    this.MovieSrv.getFavorites().pipe(tap((fav)=>{
      console.log(fav)
      this.favorites=fav
      this.favorites=this.favorites.filter(x=>x.userId==this.user.id)
      console.log(this.favorites)
    })).subscribe()

  }


}
