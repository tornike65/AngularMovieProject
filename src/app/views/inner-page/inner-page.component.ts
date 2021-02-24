import { FilterService } from './../../../services/shared-services/proxsy-services/filter.service';
import { WebWorkerService } from 'src/services/shared-services/proxsy-services/web-worker.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { WatchList } from 'src/model/watchlist.model';

@Component({
  selector: 'app-inner-page',
  templateUrl: './inner-page.component.html',
  styleUrls: ['./inner-page.component.css']
})
export class InnerPageComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer,private activeroute:ActivatedRoute,private web:WebWorkerService, private filterService:FilterService, private route:Router) {
  } 
  message:boolean;
  currentMovie:any;
  page:number = 1;
  url: string;
  urlSafe: SafeResourceUrl;
  similarmovieData:any[] = [];
  commenntData:any[] = [];
  Data:any[] = [];
  card:NodeListOf<HTMLElement>; 
  startIndex: number = 0;
  isMovie:boolean = false;
  add:boolean = false;
  disable:HTMLButtonElement =document.querySelector("#watchlist");

  
  ngOnInit(): void {
     this.movieDetail();
     this.getMovieTrailer();
     
    this.getCommentData();
     this.getSimilarMovies();
     this.filterService.currentMesage.subscribe(message=> this.message = message);
    // this.getSimilarMovies();
  }
   
   public getMovieTrailer(){
    this.activeroute.params.subscribe((o:Params) => {
      var id = o['id'];
      if(o["title"]){
        this.web.getTrailler(id).subscribe(res=>{
        this.url = `https://www.youtube.com/embed/${res.results[0].key}`;
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
      })
      }
      else{
        this.web.getTVTrailler(id).subscribe(res=>{
          this.url = `https://www.youtube.com/embed/${res.results[0].key}`;
          this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
        })
      }
      });
    }
   public movieDetail(){
    this.activeroute.params.subscribe((o:Params)=>{
      var id = o["id"];  
      this.disable = document.querySelector("#watchlist");
      this.web.getWatchList(this.page).subscribe(res=>{
          res.results.forEach(e => {
            if(e.id == id){     
              this.add = true;
             this.disableButton(this.disable)
            }
          });   
          
          this.web.getTvWatchList(this.page).subscribe(res=>{
            res.results.forEach(element => {
              if(element.id == id){     
                this.add = true;
                this.disableButton(this.disable)
               }
            });
          })
          this.page++;
      });
      

      if(o["title"]){
        this.isMovie  = true;
        this.web.getCurrentMovie(id).subscribe(res=>{
          this.currentMovie = res;
          this.url = `https://www.youtube.com/embed/${res.videos.results[0].key}`;
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
        })
      }
      else{
        this.web.getCurrentTvSerie(id).subscribe(res=>{
          this.currentMovie = res;
          this.url = `https://www.youtube.com/embed/${res.videos.results[0].key}`;
          this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
        })
      }
    });
  }

  public getSimilarMovies(){
    this.activeroute.params.subscribe((o:Params) => {
      var id = o['id'];
      if(o["title"]){
        this.web.getRecomendedMovie(id).subscribe(res=>{
        this.similarmovieData = res.results      
        })
      }

      else{
        this.web.getRecomendedTv(id).subscribe(res=>{
          this.similarmovieData = res.results;
        })
      }
     });
  }
  public movfirst(){
  this.card = document.querySelectorAll(".card11");
  if (this.startIndex == 0) {
    return;
  }
  this.startIndex -= 5
  this.card[this.startIndex].style.marginLeft = "0px";
  }
  public movnext(){
  this.card = document.querySelectorAll(".card11");
    if (this.startIndex == 15) {
      this.card[this.startIndex].style.marginLeft = "0px";
      
    }
    else {
      this.card[this.startIndex].style.marginLeft = "-992px";
    }
    this.startIndex += 5;
  }

  public addToWachList(currentMovie){
    var obj = new WatchList();
    obj.media_id = currentMovie.id;
    if(!this.isMovie){
      obj.media_type = "tv";
    }
    if(this.add){
      obj.watchlist = false;
      this.add = false;
      this.web.addWatchlist(obj).subscribe(res=>{
      });
      this.disableButton(this.disable)
    }
    else {
      this.web.addWatchlist(obj).subscribe(res=>{
      });
      this.add = true;
      this.disableButton(this.disable)
    }
  }

  public disableButton(disable:HTMLButtonElement){
    if(this.add){
      disable.style.color = "red";
      disable.title = "Remove from watchlist"

    }
    else{
      disable.style.color = "white";
      disable.title = "Add to watchlist"
    }
  }

  public filterBygenre(){
    
  }

  public getCommentData(){
    this.activeroute.params.subscribe((o:Params) => {
      var id = o['id'];
      this.web.commentData(id).subscribe(res=>{
        this.commenntData = res.results;
        console.log(this.commenntData)
      })
    })

  }
}
