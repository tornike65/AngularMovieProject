import { Params, Router } from '@angular/router';
import { Component, OnInit, Input, ViewChildren, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-slider-card',
  templateUrl: './slider-card.component.html',
  styleUrls: ['./slider-card.component.css']
})
export class SliderCardComponent implements OnInit {
  @Input() cardsData: any[] = [];
  @Input() similarmovieData: any[] = [];
  @Input() tvShowcardsData: any[] = []
  @Input() popularData: any[] = []
  @Input() tvUpcomingsData: any[] = []
  @Input() topTvSeries:any[] = [];

  @ViewChild("name") name:ElementRef;
  
  constructor(private route:Router) { }

  ngOnInit(): void {
  }
   
  public length(){
    if(this.similarmovieData.length >0){
      return true;
    }

    else {
      return false;
    }
  }

  public showFullmovie(item:any){
    if(item.name){
      this.route.navigate(["episode",item.name,item.id,item.original_language]);
   }
   this.route.navigate(["movies",item.title,item.id,item.original_language]);
 }
 
}
