import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css'],
  providers: [EventService]
})
export class EditEventComponent implements OnInit {
  id_event: number;
  current_user: any;
  event: any = {};
  messege: any;
  error_messege: any;

  constructor(private route: ActivatedRoute, private eventService: EventService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.id_event = +this.route.snapshot.params['id'];
    this.current_user = JSON.parse(localStorage.getItem('currentUser'));
    this.getEventInfo();
  }

  getEventInfo(){
    this.eventService.getEvent(this.current_user.authentication_token, this.id_event).
      subscribe(response => this.onGetEventSuccess(response),
        response => this.onGetEventError(response))
  }

  onGetEventSuccess(response){
    console.log("nhihi");
    this.event = response.data.event
  }

  onGetEventError(response){
    console.log("dm");
  }

  onUpdateButton(event: any, value: any){
    console.log(event);
    if (value == ""){
      this.messege = [];
      this.error_messege = ["Value Update is Null, please try again"]
    } else {
      this.eventService.updateEvent(this.current_user.authentication_token, this.id_event, event).
       subscribe(response => this.onUpdateSuccess(response),
        response => this.onUpdateError(response))
    }
  }

  onUpdateSuccess(response){
    console.log(response);
    this.messege = [response.messeges];
    this.error_messege = [];
    this.event = response.event;
  }

  onUpdateError(response){
    this.messege = [];
    this.error_messege = [response.messeges];
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogDeleteEvent, {
      width: '600px',
      height: '190px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `<div class="modal-header">
               <h4 class="modal-title">Are you sure???</h4>
             </div>
              <div class="modal-body">
                <p>Are you sure you want to delete this event ?</p>
                <div class="row">
                    <div class="col-12-xs text-center">
                        <button class="btn btn-success btn-md">Yes</button>
                        <button class="btn btn-danger btn-md">No</button>
                    </div>
                    <br>
                </div>
              </div>`,
})
export class DialogDeleteEvent {

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteEvent> ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
