import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-show-event',
  templateUrl: './show-event.component.html',
  styleUrls: ['./show-event.component.css'],
  providers: [EventService]
})
export class ShowEventComponent implements OnInit {
  id_event: any;
  owner: any[]=[];
  current_user: any;
  event: any= {};

  constructor( private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id_event = +this.route.snapshot.params['id'];
    this.current_user = JSON.parse(localStorage.getItem('currentUser'));
    this.getEventInfo();
  }

  getEventInfo(){
    this.eventService.getEvent(this.current_user.authentication_token, this.id_event).
      subscribe(response => this.onGetEventSuccess(response))
  }

  onGetEventSuccess(response){
    this.event = response.data.event
    this.owner = this.event.owner
  }

}
