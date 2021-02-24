import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { WebWorkerService } from 'src/services/shared-services/proxsy-services/web-worker.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  public genreData: any[] = [];
  public watchlistData: any[] = [];
  public MainwatchlistData: any[] = [];
  public filterData:any[] = [];
  page:number = 1;
  genre:any[] = [];
  filter:boolean = false;
  exist:boolean =false;
  constructor(private web: WebWorkerService) { }

  ngOnInit(): void {
    this.getGenres();
    this.getWatchListData();
    this.getTvWatchlist();
  }

  public getWatchListData(){
    this.web.getWatchList(this.page).subscribe(res=>{
      res.results.forEach(element => {
        this.watchlistData.push(element);
        this.MainwatchlistData.push(element);
      });
    });
  }

  public getTvWatchlist(){
    this.web.getTvWatchList(this.page).subscribe(res=>{
      res.results.forEach(element => {
        this.watchlistData.push(element);
        this.MainwatchlistData.push(element);
      });
    })
  }

  public getGenres() {
    this.web.getMovieGenres().subscribe(res => {
      this.genreData = res.genres;
    })
  }

  public navigate(item: any) {
    console.log(item)
    this.filterData = [];
    this.genre.forEach(e => {
      if (e == item.id) {
        this.exist = true;
        var index = this.genre.indexOf(item.id);
        this.genre.splice(index, 1);       
      }
    })
    if (!this.exist) {
      this.genre.push(item.id)
    }
    this.page = 1;
  }

  public filterByGenre(item: any,btn:HTMLButtonElement) {
      this.watchlistData.forEach(element=>{
        element.genre_ids.forEach(el => {
          if(el == item.id){
            this.filterData.push(element)
          }
        });
      })
      if (btn.style.background != "rgb(26, 144, 207)") {
        btn.style.background = "rgb(26, 144, 207)"
        this.watchlistData = this.filterData;
      }
      else {
        btn.style.background = "#282C33";
        this.watchlistData = this.MainwatchlistData;
        this.exist = false;
      }
  }

}
