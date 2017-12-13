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
  list_admin: any[]=[];

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
    this.list_membered = [];
    this.member_waiting = [];
    this.list_admin = [];
    this.info_group = response.data.group;
    this.member_waiting = response.data.member_waiting;
    this.list_membered = response.data.list_membered;
    for ( var i = 0; i < this.list_membered.length; i++){
      if (this.list_membered[i].admin){
        this.list_admin.push(this.list_membered[i])
      }
    }
  }

  onErrorGetGroupInfo(){
    this.router.navigate(['/']);
  }

  onAcceptButton(id_member_group: any){
    this.groupSevice.adminAcceptRequest(this.current_user.authentication_token, id_member_group).
      subscribe(response => this.onAcceptSuccess(response))
  }

  onAcceptSuccess(response){
    console.log(response.data.user);
    for ( var i = 0; i < this.member_waiting.length; i++){
      if (this.member_waiting[i].member.id == response.data.user.member.id){
        this.member_waiting.splice(i,1)
        this.list_membered.push(response.data.user)
        console.log(i + "hihi")
      }
    }
  }

  onDeleteGroupButton(){
    this.groupSevice.deleteGroup(this.current_user.authentication_token, this.info_group.id).
      subscribe(response => this.onDeleteGroupSuccess(response))
  }

  onDeleteGroupSuccess(response){
    console.log(this.list_membered);
    for ( var i = 0; i < this.list_membered.length; i++){
      if (this.list_membered[i].id == response.data.membered.id){
        this.list_membered.splice(i,1)
        console.log(i + "hihi")
      }
    }
  }

  onDeleteMember(value: any){
    console.log("ok");
    this.groupSevice.adminDeleteMember(this.current_user.authentication_token, value).subscribe(response => this.onDeleteGroupSuccess(response))
  }

  addAdmin(id_member_group){
    this.groupSevice.addAdminGroup(this.current_user.authentication_token, id_member_group).
      subscribe(response => this.onAddAdminSuccess(response))
  }

  onAddAdminSuccess(response){
    this.getGroupThumbnail();
  }

  deleteAdmin(id_member_group){
    this.groupSevice.delteteAdminGroup(this.current_user.authentication_token, id_member_group).
      subscribe(response => this.onAddAdminSuccess(response))
  }

}
