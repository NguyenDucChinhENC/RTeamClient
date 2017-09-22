import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
  providers: [ProfileService],
})
export class UpdateUserComponent implements OnInit {

  user_id: any;
  currentUser: any = {};

  constructor(private profileServive: ProfileService) { }

  ngOnInit() {
    this.getDataUser();
  }

  getDataUser(){
    if (localStorage.getItem('currentUser')){
    this.user_id = JSON.parse(localStorage.getItem('currentUser')).id;
    this.profileServive.getInfoUser(this.user_id).subscribe(
      response => this.onNextGetInfo(response)
    )
  }
  }
  
  onNextGetInfo(response){
    this.currentUser = response;
    console.log(response);
  }

  onClickUpdate(value: any){
    console.log(value);
    const token = JSON.parse(localStorage.getItem('currentUser')).authentication_token;
    this.profileServive.updateUser(value, this.user_id, token).subscribe(
      response => this.onNext(response),
      response => this.onError(response)
    )
  }

  onNext(response){
    console.log(response)
  }

  onError(response){
    console.log(response)
  }

}
