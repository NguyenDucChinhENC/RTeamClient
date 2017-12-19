import { Component, OnInit } from '@angular/core';
import { HomeService} from './home.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  current_user: any;
  events: any[]=[];
  events_comming: any[]=[];
  constructor(private homeService: HomeService,  private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.current_user = JSON.parse(localStorage.getItem('currentUser'));
    this.getEvents();
    }

  getEvents(){
    this.homeService.getEvent(this.current_user.authentication_token).
      subscribe(response => this.getEventsSuccess(response))
  }

  getEventsSuccess(response){
    this.events = response.data.events;
    this.events_comming = response.data.events_comming;
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
}
}
