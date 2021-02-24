import { WebWorkerService } from 'src/services/shared-services/proxsy-services/web-worker.service';
import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {

  constructor(private web:WebWorkerService, private route:Router) { }
  filterData:any[] = [];
  searchresult: HTMLElement;
  show: boolean = false;
  public user:any;
  ngOnInit(): void {
  }
  status: boolean = false;
     public showMenu(){
    this.status = !this.status;       
   }
  public goWatchlist(){
    this.route.navigate(["watchlist"]);
  }
   public search(searchword:string){
     console.log(searchword);
     if(searchword.length < 2){
       this.searchresult.style.display = "none";
       return false;
     }

     else{
       this.searchresult = document.querySelector(".searh-result")
         this.web.filterBy(searchword).subscribe(response=>{
          this.filterData = response.results;
          this.searchresult.style.display = "flex";
         })   
         return true;
     }
   }

   public GoInnerPage(item:any){
     if(item.media_type == "movie"){
       this.route.navigate(["movies",item.title,item.id,item.original_language]);
     }

     else{
      this.route.navigate(["episode",item.name,item.id,item.original_language]);

     }
   }

   public userInfo(ul: HTMLElement) {
    if (!this.show) {
      ul.style.display = "block";
      this.show = true;
    }
    else {
      ul.style.display = "none";
      this.show = false;
    }
  }
 
  // public getUser(){
  //   this.web.getUserInfo().subscribe(res=>{
  //     this.user = res;
  //   })
  // }
}
