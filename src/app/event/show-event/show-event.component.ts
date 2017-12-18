import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';
import { MemberButton } from '../../group/group-thumbnail/group-thumbnail.component';

declare interface ButtonMember {
  status: boolean;
  title: any;
  action: any;
}

export const buttonMember: ButtonMember[] =
  [
    {status: true, title: "Joined", action: "Cancel Join"},
    {status: false, title: "Not Joined", action: "Join"}
  ]

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
  status_join: any;
  member_button: any={};

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
    if (this.event.member){
      this.member_button = buttonMember.filter(buttonMember => buttonMember)[0];
    }else{
      this.member_button = buttonMember.filter(buttonMember => buttonMember)[1];
    }
  }

  onButtonJoin(){
    if (this.member_button.status){
      this.eventService.cancelJoinEvent(this.current_user.authentication_token, this.event.member).
        subscribe(response => this.onCancelJoinSuccess(response))
    } else {
      this.eventService.joinEvent(this.current_user.authentication_token, this.id_event).
      subscribe(response => this.onJoinSuccess(response))
    }
  }

  onJoinSuccess(response){
    this.member_button = buttonMember.filter(buttonMember => buttonMember)[0];
    this.event.member = response.data.member_event.id;
  }

  onCancelJoinSuccess(response){
    this.member_button = buttonMember.filter(buttonMember => buttonMember)[1];
    this.event.member = false;
  }
}
