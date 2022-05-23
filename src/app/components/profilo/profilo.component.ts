import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth-service.service';
import { tap } from 'rxjs';
import { MovieListService } from 'src/app/service/movie-list.service';
import { Favorites } from 'src/app/interface/favorites';
import { Movies } from 'src/app/interface/movies';

@Component({
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.scss']
})
export class ProfiloComponent implements OnInit {
  user!:{id: number; email: string; name: string; username: string;}

  constructor(private AuthSrv:AuthService,private MovieSrv:MovieListService) { }
  movieArray:Movies[]=[]
  favorites:Favorites[]=[]

  ngOnInit(): void {
    this.loadAllfilm()

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
      this.stampaFilm()
    })).subscribe()
  }

  loadAllfilm(){
    this.loadFilmPopular()
    this.loadFilmMostRated()
    this.stampaFilm()
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

  stampaFilm(){
    console.log(this.movieArray)
      for(let i=this.favorites.length;i--;i>=0){

      let indx=this.movieArray.findIndex(x=>x.id===this.favorites[i].movieId)
      let productMovie=this.movieArray[indx]

      let card=document.createElement('div')
      card.setAttribute('class','card m-3 d-flex flex-column flex-shrink-1')
      card.setAttribute('style','width: auto;height: 800px;')
      let title=document.createElement('h5')
      title.setAttribute('class','card-title text-center text-dark')
      title.setAttribute('style','height: 5%;')
      let cardBody=document.createElement('div')
      cardBody.setAttribute('class','card-body')
      cardBody.setAttribute('style','width:auto;height: 50%;')
      let cardDivImg=document.createElement('div')
      cardDivImg.setAttribute('style','width:auto;height: 100%;')
      let cardImg=document.createElement('img')
      cardImg.setAttribute('class','card-img-top')
      cardImg.setAttribute('style','max-width: auto;height:100%;')
      cardImg.setAttribute('src','http://image.tmdb.org/t/p/w500/'+productMovie.poster_path)
      cardDivImg.append(cardImg)
      let cardFoot=document.createElement('div')
      cardFoot.setAttribute('class','card-footer')
      cardFoot.setAttribute('style','width:auto;height: 10%;')
      let Vote=document.createElement('h3')

      title.innerHTML=productMovie.title
      card.append(title)
      cardDivImg.append(cardImg)
      cardBody.append(cardDivImg)
      card.append(cardBody)
      cardFoot.append(Vote)
      cardFoot.append(`${productMovie.original_title}`)
      card.append(cardFoot)
      document.getElementById('containerFilm')?.append(card)
    }
  }


}
