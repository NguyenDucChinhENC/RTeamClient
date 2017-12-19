import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-member',
  templateUrl: './list-member.component.html',
  styleUrls: ['./list-member.component.css'],
  providers: [EventService]
})
export class ListMemberComponent implements OnInit {

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

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}
}
