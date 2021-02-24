import { WebWorkerService } from 'src/services/shared-services/proxsy-services/web-worker.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { filter } from 'rxjs/operators';
import { element } from 'protractor';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-tvseries',
  templateUrl: './tvseries.component.html',
  styleUrls: ['./tvseries.component.css']
})
export class TvseriesComponent implements OnInit {
  public tvSerieData: any[] = [];
  public genreData: any[] = [];
  public mainTvSeries:any[] = [];
  body: Element;
  button:HTMLButtonElement;
  exist:boolean =false;
  genre:any[] = [];
  page: number = 1;
  change : boolean = false;
  filter: boolean = false;
  btn:NodeListOf<HTMLElement>;
   constructor(private web: WebWorkerService, private route: Router, private activeroute: ActivatedRoute) { }


  ngOnInit(): void {
    this.tvSeries();
    this.SmartScroll();
    this.getGenres();
  }


  public getGenres() {
    this.web.getTvGenres().subscribe(res => {
      this.genreData = res.genres;

    })
  }

  public tvSeries() {
    this.web.getTVdata(this.page).subscribe(res => {
      res.results.forEach(element => {
        this.tvSerieData.push(element);
      });
    })
    this.page++;
  }

  public SmartScroll() {
    var self = this;
    self.body = document.querySelector("body");
    window.addEventListener("scroll", function () {
      if ((this.scrollY + this.innerHeight + 500) >= self.body.scrollHeight) {
        if (self.filter == false) {
          self.tvSeries();
        }
        else {
           self.page++;
           self.filterByGenre(self.genre,self.button);  
        }
      }
    })
  }

  public navigate(item:any) {
    this.page = 1;
    this.tvSerieData = [];
    this.genre.forEach(e=>{
      if(e == item.id) {
        this.exist = true;
        var index = this.genre.indexOf(item.id);
        this.genre.splice(index,1);
      }
    })
    if(!this.exist){
      this.genre.push(item.id)
    }
    this.page = 1;
  }

  public filterByGenre(item: any,btn:HTMLButtonElement) {
    this.filter = true;
    this.web.filterTvSeries(this.genre, this.page).subscribe(res => {
      res.results.forEach(element => {
        this.tvSerieData.push(element);
      });
    })
    if(btn.style.background != "rgb(26, 144, 207)"){
      btn.style.background = "rgb(26, 144, 207)"
    }
    else{
     btn.style.background = "#282C33";    
     this.mainTvSeries = this.tvSerieData;
     this.exist = false;
    }
  }

}
