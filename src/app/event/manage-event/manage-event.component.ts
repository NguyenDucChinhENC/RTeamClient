import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.css'],
  providers: [EventService],
})
export class ManageEventComponent implements OnInit {

  id_event: any;
  event: any={};
  members: any[]=[];
  current_user: any;
  owner: any[]=[];

  constructor(private eventService: EventService, private route: ActivatedRoute) { }

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
    this.event = response.data.event;
    this.members = this.event.member_joined;
    this.owner = this.event.owner
  }

  onRemoveMember(id: any){
    this.eventService.cancelJoinEvent(this.current_user.authentication_token, id).
    subscribe(response => this.onRemoveSuccess(response))
  }

  onRemoveSuccess(response){
    console.log(response)
    for ( var i = 0; i < this.members.length; i++){
      if (this.members[i].member_event_id == response.member_event_id){
        this.members.splice(i,1)
      }
    }
  }

  onAddAdmin(user_id: any){
    this.eventService.addAdminEvent(this.current_user.authentication_token, this.event.id, user_id).
      subscribe(response => this.onAddAdminSuccess(response))
  }

  onAddAdminSuccess(response){
    console.log(response)
  }

}
