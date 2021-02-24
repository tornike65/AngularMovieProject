import { TvseriesComponent } from './views/tvseries/tvseries.component';
import { InnerPageComponent } from './views/inner-page/inner-page.component';
import { MovieComponent } from './views/movie/movie.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './views/homepage/homepage.component';
import { WatchlistComponent } from './views/watchlist/watchlist.component';


const routes: Routes = [
  {path:'',component:HomepageComponent},
  {path:'movies',component:MovieComponent},
  {path:'episode',component:TvseriesComponent},
  {path:'movies/:title/:id/:original_language',component:InnerPageComponent},
  {path:'episode/:name/:id/:original_language',component:InnerPageComponent},
  {path:'movies/:id',component:MovieComponent},
  {path:'episode/genres/:id',component:TvseriesComponent},
  {path:'watchlist',component:WatchlistComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//https://api.adjaranet.com/api/v1/movies/878465623/season-files/0?source=adjaranet