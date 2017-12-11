import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css'],
  providers: [EventService],
})
export class NewEventComponent implements OnInit {
  id_group: number;
  current_user: any;
  error_message: any;

  constructor(private eventSevice: EventService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.id_group = +this.router.snapshot.params['id'];
    this.current_user = JSON.parse(localStorage.getItem('currentUser'));
  }

  onClickSubmitNewEvent(value: any){
    this.id_group = +this.router.snapshot.params['id'];
    this.eventSevice.newEvent(this.current_user.authentication_token, value, this.id_group).subscribe(
      response => this.onSuccessCreateEvent(response),
      response => this.onErrorCreateEvent(response)
    )
  }

  onSuccessCreateEvent(response){
    console.log('hihi')
  }

  onErrorCreateEvent(response){
    this.error_message = JSON.parse(response._body).error;
    console.log(this.error_message)
  }
}
