import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service'
import { ActivatedRoute , Router } from '@angular/router';

declare const $: any;
declare interface ButtonMember {
    path: any;
    title: string;
    action: any;
}
export const MemberButton: ButtonMember[] = [
    { path: '', title: 'Joined', action: 'Leave Group'},
    { path: '', title: 'Pending', action: 'Cancel Request'},
    { path: "joinGroup()", title: 'Join Group', action: 'Join Group'}
];


@Component({
  selector: 'app-group-thumbnail',
  templateUrl: './group-thumbnail.component.html',
  styleUrls: ['./group-thumbnail.component.css'],
  providers: [GroupService],
})
export class GroupThumbnailComponent implements OnInit {

  id_group: number;
  current_user: any = {};
  info_group: any = {};
  member_button: any = {};
  status_user: number = 3;
  is_admin: boolean = false;
  events: any = [];

  constructor(
    private groupSevice: GroupService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.getGroupThumbnail();
    
  }

  getGroupThumbnail(){
    this.id_group = this.route.snapshot.params['id'];
    this.current_user = JSON.parse(localStorage.getItem('currentUser'));
    this.groupSevice.getGroupThumbnail(this.current_user.authentication_token, this.id_group).
      subscribe(response => this.onSuccessGetGroupInfo(response),
      response => this.onErrorGetGroupInfo())
  }

  onSuccessGetGroupInfo(response){
    this.info_group = response.data.group;
    this.is_admin = response.data.admin;
    this.events = response.data.events;
    if (response.data.membered == true){
      this.member_button = MemberButton.filter(memberButton => memberButton)[0];
      this.status_user =0;
    }else {
      if (response.data.accept == true){
        this.member_button = MemberButton.filter(memberButton => memberButton)[1];
        this.status_user =1;
      } else {
        this.member_button = MemberButton.filter(memberButton => memberButton)[2];
        this.status_user =2;
      }
    }
    console.log(this.member_button)
  }

  onErrorGetGroupInfo(){
    this.router.navigate(['/']);
  }

  action() {
    if (this.status_user == 2)
    this.groupSevice.joinGroup(this.current_user.authentication_token,this.id_group).
      subscribe(response => this.onJoinGroupSuccess(response))
  }

  onJoinGroupSuccess(response){
    this.getGroupThumbnail();
    console.log("want join");
  }
}
