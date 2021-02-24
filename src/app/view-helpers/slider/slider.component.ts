import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  @Input() sliderData:any[] =[];
  constructor(private route:Router) { }

  ngOnInit(): void {
  }

 public fullMovie(item:any){
  if(item.name){
     this.route.navigate(["episode",item.name,item.id,item.original_language]);
  }
  this.route.navigate(["movies",item.title,item.id,item.original_language]);
}
}
