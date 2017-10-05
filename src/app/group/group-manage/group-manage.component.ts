import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service'
import { ActivatedRoute , Router } from '@angular/router';

@Component({
  selector: 'app-group-manage',
  templateUrl: './group-manage.component.html',
  styleUrls: ['./group-manage.component.css'],
  providers: [GroupService]
})
export class GroupManageComponent implements OnInit {

  id_group: number;

  info_group: any = {};
  member_waiting: any[] = [];
  list_membered: any[] = [];

  current_user: any = {};
  member_button: any = {};
  status_user: number = 3;

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
    this.member_waiting = response.data.member_waiting;
    this.list_membered = response.data.list_membered;
  }

  onErrorGetGroupInfo(){
    this.router.navigate(['/']);
  }

  onAcceptButton(id_member_group: any){
    this.groupSevice.adminAcceptRequest(this.current_user.authentication_token, id_member_group).
      subscribe(response => this.onAcceptSuccess(response))
  }

  onAcceptSuccess(response){
    console.log(this.member_waiting);
  }

  onDeleteGroupButton(){
    this.groupSevice.deleteGroup(this.current_user.authentication_token, this.info_group.id).
      subscribe(response => this.onDeleteGroupSuccess(response))
  }

  onDeleteGroupSuccess(response){
    console.log("delete group success");
  }

}
