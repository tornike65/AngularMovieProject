import { HttpClient } from '@angular/common/http';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private HttpClient:HttpClient) { }
  
  filteredCollectionChangeEmiter:EventEmitter<any[]> = new EventEmitter();
  private messageSource = new BehaviorSubject<boolean>(false);
  currentMesage = this.messageSource.asObservable();
  changeMessage(message:boolean){
    this.messageSource.next(message);
  }
  // public filterBy(query:string){
  //   return this.HttpClient.get(`https://api.themoviedb.org/3/search/movie?api_key=5bae431708df8d200beef2e7ac5adc87&language=en-US&query=Homeland&page=1&include_adult=true`).pipe(map((o: any) => {
  //     return o;
  //   }))
  // }

}