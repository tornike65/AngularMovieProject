import { Component, OnInit } from '@angular/core';
import { WebWorkerService } from 'src/services/shared-services/proxsy-services/web-worker.service';
import { strict } from 'assert';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public sliderData: any[] = [];
  public cardsData: any[] = [];
  public popularData: any[] = [];
  public tvShowcardsData: any[] = [];
  public tvUpcomingsData: any[] = [];
  public kidsData: any[] = [];
  public topTvSeries:any[] =[];
  day:boolean = true;
  week:boolean = false;
  card: NodeListOf<Element>;
  startIndex: number = 0;

  constructor(private webWorker: WebWorkerService) { }


  ngOnInit(): void {
    this.getSliderData();
    this.getCardsData();
    this.getTvShowCardsData();
    this.getPopularData();
    this.getPremiereData();
    this.getTopTvSeries();

   }

  public movfirst1() {
    this.card = null;
    this.card = document.querySelectorAll(".card1");
    this.first(this.card);
  }
  public movnext1() {
    this.card = null;
    this.card = document.querySelectorAll(".card1");
    this.next(this.card);
  }
  public movfirst2() {
    this.card = null;
    this.card = document.querySelectorAll(".card2");
    this.first(this.card);
  }
  public movnext2() {
    this.card = null;
    this.card = document.querySelectorAll(".card2");
    this.next(this.card);
  }
  public movfirst3() {
    this.card = null;
    this.card = document.querySelectorAll(".card3");
    this.first(this.card);
  }
  public movnext3() {
    this.card = null;
    this.card = document.querySelectorAll(".card3");
    this.next(this.card);
  }
  public movfirst4() {
    this.card = null;
    this.card = document.querySelectorAll(".card4");
    this.first(this.card);
  }
  public movnext4() {
    this.card = null;
    this.card = document.querySelectorAll(".card4");
    this.next(this.card);
  }
  public movfirst10() {
    this.card = null;
    this.card = document.querySelectorAll(".card10");
    this.first(this.card);
  }
  public movnext10() {
    this.card = null;
    this.card = document.querySelectorAll(".card10");
    this.next(this.card);
  }

  public next(card) {
    if (this.startIndex == 20) {
      return
    }
    else if (this.startIndex == 15) {
      card[this.startIndex].style.marginLeft = "-730px";
    }
    else {
      card[this.startIndex].style.marginLeft = "-1640px";
    }
    this.startIndex += 5;
  }
  public first(card) {
    if (this.startIndex == 0) {
      return;
    }
    this.startIndex -= 5
    card[this.startIndex].style.marginLeft = "0px";
  }
  public getCardsData() {
    this.webWorker.getMovieDataFromApi(1).subscribe(response => {
      this.cardsData = response.results;
    })
  }
  public getTvShowCardsData() {
    this.webWorker.getTVdata(1).subscribe(response => {
      this.tvShowcardsData = response.results;
    })
  }
  public getSliderData() {
    this.webWorker.sliderData().subscribe(response => {
      this.sliderData = response.results.slice(0,5);
      console.log(this.sliderData)
    });
  }
  public getPopularData() {
    this.webWorker.getPopulardata("day").subscribe(res => {
      this.popularData = res.results;
    })
  }
  public getPremiereData() {
    this.webWorker.getPremieredata().subscribe(res => {
      this.tvUpcomingsData = res.results;
    })
  }

  public getTopTvSeries(){
    this.webWorker.getTopTvSeriesData().subscribe(res=>{
      this.topTvSeries = res.results;
    })
  }

  public popularByDay(btn:HTMLButtonElement,week:HTMLButtonElement){
    if(!this.week && this.day){
      return;
    }
    else{
      week.style.background = "transparent";
      btn.style.background = "#1A90CF";
      this.webWorker.getPopulardata("day").subscribe(rs=>{
           this.popularData = rs.results;
           this.day = true;
           this.week = false;

      })
    }
  }

  public popularByWeek(btn:HTMLButtonElement,day:HTMLButtonElement){
     if(!this.day && this.week){
       return;
     }
     else{
      day.style.background = "transparent";
      btn.style.background = "#1A90CF";
      this.webWorker.getPopulardata("week").subscribe(rs=>{
           this.popularData = rs.results;
           this.week = true;
           this.day = false;
      })
     }
  }

}
