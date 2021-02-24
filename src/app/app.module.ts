import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarMenuComponent } from './navigation/sidebar-menu/sidebar-menu.component';
import { SliderComponent } from './view-helpers/slider/slider.component';
import { CardsComponent } from './view-helpers/cards/cards.component';
import { from } from 'rxjs';
import { WebWorkerService } from 'src/services/shared-services/proxsy-services/web-worker.service';
import { HomepageComponent } from './views/homepage/homepage.component';
import { SliderCardComponent } from './view-helpers/slider-card/slider-card.component';
import { FooterComponent } from './footer/footer.component';
import { MovieComponent } from './views/movie/movie.component';
import { InnerPageComponent } from './views/inner-page/inner-page.component';
import { CastCardComponent } from './view-helpers/cast-card/cast-card.component';
import { TvseriesComponent } from './views/tvseries/tvseries.component';
import { WatchlistComponent } from './views/watchlist/watchlist.component';
import { LoaderService } from 'src/services/shared-services/proxsy-services/loader.service';
import { InterceptorService } from 'src/services/shared-services/proxsy-services/interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { filter } from 'rxjs/operators';
import { FilterService } from 'src/services/shared-services/proxsy-services/filter.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderComponent } from './view-helpers/loader/loader.component';
import { CommentComponent } from './view-helpers/comment/comment.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarMenuComponent,
    SliderComponent,
    CardsComponent,
    HomepageComponent,
    SliderCardComponent,
    FooterComponent,
    MovieComponent,
    InnerPageComponent,
    CastCardComponent,
    TvseriesComponent,
    WatchlistComponent,
    LoaderComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [WebWorkerService, LoaderService, FilterService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
