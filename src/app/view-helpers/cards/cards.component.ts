import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { FilterService } from 'src/services/shared-services/proxsy-services/filter.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input() movieData:any[] =[];
  @Input() tvSerieData:any[] =[];
  @Input() watchlistData:any[] = [];
  
  constructor(private route:Router) {}

  
  ngOnInit(): void {
  }

  public showInnerPage(item:any){
    if(item.name){
       this.route.navigate(["episode",item.name,item.id,item.original_language]);
    }
    this.route.navigate(["movies",item.title,item.id,item.original_language]);
  }
}
