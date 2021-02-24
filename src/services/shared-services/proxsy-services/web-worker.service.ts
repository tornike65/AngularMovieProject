import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { WatchList } from 'src/model/watchlist.model';

@Injectable({
  providedIn: 'root'
})
export class WebWorkerService {
  constructor(private httpClient: HttpClient) { }

  public sliderData() {
    return this.httpClient.get(`
    https://api.themoviedb.org/3/movie/upcoming?api_key=5bae431708df8d200beef2e7ac5adc87&language=en-US&page=`).pipe(map((o: any) => {
      return o;
    }))
  }

  public commentData(id:number) {
    return this.httpClient.get(`
    https://api.themoviedb.org/3/movie/${id}/reviews?api_key=5bae431708df8d200beef2e7ac5adc87&language=en-US&page=1`).pipe(map((o: any) => {
      return o;
    }))
  }

  public getMovieDataFromApi(page:number) {
    return this.httpClient.get(`https://api.themoviedb.org/3/movie/popular?api_key=5bae431708df8d200beef2e7ac5adc87&language=en-US&page=${page}`).pipe(map((o: any) => {
      return o;

    }))
  }

  public getCurrentMovie(id:number){
    return this.httpClient.get(`https://api.themoviedb.org/3/movie/${id}?api_key=5bae431708df8d200beef2e7ac5adc87&language=en-US
    `).pipe(map((o: any) => {
      return o;

    }))
  }

  public getCurrentTvSerie(id:number){
    return this.httpClient.get(`https://api.themoviedb.org/3/tv/${id}?api_key=5bae431708df8d200beef2e7ac5adc87&language=en-US
    `).pipe(map((o: any) => {
      return o;
    }))
  }

  public getTVdata(page:number) {
    return this.httpClient.get(`https://api.themoviedb.org/3/tv/popular?api_key=5bae431708df8d200beef2e7ac5adc87&language=en-US&page=${page}`).pipe(map((o: any) => {
      return o;
    }))
  }

  public getPopulardata(range:string) {
    return this.httpClient.get(`https://api.themoviedb.org/3/trending/movie/${range}?api_key=5bae431708df8d200beef2e7ac5adc87`).pipe(map((o: any) => {
      return o;
    }))
  }

  public getPremieredata() {
    return this.httpClient.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=5bae431708df8d200beef2e7ac5adc87&language=en-US&page=1`).pipe(map((o: any) => {
      return o;
    }))
  }


  
  public getTopTvSeriesData() {
    return this.httpClient.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=5bae431708df8d200beef2e7ac5adc87&language=en-US&page=1`).pipe(map((o: any) => {
      return o;
    }))
  }

  public getTrailler(id:number){
   return this.httpClient.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=5bae431708df8d200beef2e7ac5adc87&language=en-US`).pipe(map((o: any) => {
      return o;
    }))
  }

  public getTVTrailler(id:number){
    return this.httpClient.get(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=5bae431708df8d200beef2e7ac5adc87&language=en-US`).pipe(map((o: any) => {
       return o;
     }))
   }
 

  public getTvGenres(){
    return this.httpClient.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=5bae431708df8d200beef2e7ac5adc87&language=en-US`).pipe(map((o: any) => {
       return o;
     }))
   }

   public getMovieGenres(){
    return this.httpClient.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=5bae431708df8d200beef2e7ac5adc87&language=en-US`).pipe(map((o: any) => {
       return o;
     }))
   }
  
   public getRecomendedMovie(id){
    return this.httpClient.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=5bae431708df8d200beef2e7ac5adc87&language=en-US&page=1`).pipe(map((o: any) => {
       return o;
     }))
   }

   public getRecomendedTv(id){
    return this.httpClient.get(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=5bae431708df8d200beef2e7ac5adc87&language=en-US&page=1`).pipe(map((o: any) => {
       return o;
     }));
   }

   public filterTvSeries(genre_id:number[],page:number){
    return this.httpClient.get(`https://api.themoviedb.org/3/discover/tv?api_key=5bae431708df8d200beef2e7ac5adc87&language=en-US&sort_by=popularity.desc&page=${page}&timezone=America%2FNew_York&with_genres=${genre_id}&include_null_first_air_dates=false`).pipe(map((o: any) => {
       return o;
     }))
   }

   public filterMovie(genre_id:number[],page:number){
    return this.httpClient.get(`https://api.themoviedb.org/3/discover/movie?api_key=5bae431708df8d200beef2e7ac5adc87&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genre_id}`).pipe(map((o: any) => {
       return o;
     }))
   }
   
  public filterBy(query:string){
    return this.httpClient.get(`https://api.themoviedb.org/3/search/multi?api_key=5bae431708df8d200beef2e7ac5adc87&language=en-US&query=${query}&page=1&include_adult=false
    `).pipe(map((o: any) => {
      return o;
    }))
  }

  public getWatchList(page:number){
    return this.httpClient.get(`https://api.themoviedb.org/3/account/9195247/watchlist/movies?api_key=5bae431708df8d200beef2e7ac5adc87&language=en-US&session_id=9711374ae75187aa9b5c80a085e98a45b61cfb12&sort_by=created_at.asc&page=${page}`).pipe(map((o: any) => {
      return o;
    }));
  }

  public getTvWatchList(page:number){
    return this.httpClient.get(`https://api.themoviedb.org/3/account/9195247/watchlist/tv?api_key=5bae431708df8d200beef2e7ac5adc87&language=en-US&session_id=9711374ae75187aa9b5c80a085e98a45b61cfb12&sort_by=created_at.asc&page=${page}`).pipe(map((o: any) => {
      return o;
    }));
  }

  public addWatchlist(obj:WatchList){
    let headers = new HttpHeaders({'content-Type':'application/json'});
    return  this.httpClient.post("https://api.themoviedb.org/3/account/9195247/watchlist?api_key=5bae431708df8d200beef2e7ac5adc87&session_id=9711374ae75187aa9b5c80a085e98a45b61cfb12",obj,{headers:headers}).pipe(map(response=>{
      return response
    }));
  }

}