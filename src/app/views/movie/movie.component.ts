import { FilterService } from './../../../services/shared-services/proxsy-services/filter.service';
import { element } from 'protractor';
import { WebWorkerService } from 'src/services/shared-services/proxsy-services/web-worker.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  public movieData: any[] = [];
  public genreData: any[] = [];
  public mainMovieData: any[] = [];
  public langData: any[] = [];
  public country: any[] = [];

  body: Element;
  button: HTMLButtonElement;
  exist: boolean = false;
  genre: any[] = [];
  page: number = 1;
  filter: boolean = false;
  constructor(private web: WebWorkerService, private route: Router, private activeroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getMovieData();
    this.SmartScroll();
    this.getGenres();
  }

  public getMovieData() {
    this.web.getMovieDataFromApi(this.page).subscribe(res => {
      res.results.forEach(element => {
        this.movieData.push(element);
        this.mainMovieData.push(element);
      });
    })
    this.page++;
  }

  public getGenres() {
    this.web.getMovieGenres().subscribe(res => {
      this.genreData = res.genres;
    })
  }

  public SmartScroll() {
    var self = this;
    self.body = document.querySelector("body");
    window.addEventListener("scroll", function () {
      if ((this.scrollY + this.innerHeight + 500) >= self.body.scrollHeight) {
        if (self.filter == false) {
          self.getMovieData();
        }
        else {
          self.page++;
          self.filterByGenre(self.genre, self.button);
        }
      }
    });
  }

  public navigate(item: any) {
    this.movieData = [];
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

  public filterByGenre(item: any, btn: HTMLButtonElement) {
    console.log(item)
    this.filter = true;
    this.web.filterMovie(this.genre, this.page).subscribe(res => {
      res.results.forEach(element => {
        this.movieData.push(element);
      });
    })

    if (btn.style.background != "rgb(26, 144, 207)") {
      btn.style.background = "rgb(26, 144, 207)"
    }
    else {
      btn.style.background = "#282C33";
      this.mainMovieData = this.movieData;
      this.exist = false;
    }
  }
}
