import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service'
import { ActivatedRoute , Router } from '@angular/router';
import { IMG_URL } from '../../constants';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

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
  member_total: any =0;
  event_total: any=0;
  status_user: number = 3;
  is_admin: boolean = false;
  id_member_group = -1;
  cover: any;
  events: any = [];

  constructor(
    private groupSevice: GroupService,
    private route: ActivatedRoute,
    private router: Router,
    private _sanitizer: DomSanitizer
    ) { }
  ngOnInit() {
    this.getGroupThumbnail();
    
  }

  onBodyTextEditorKeyup(event){
    console.log()
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
    if (this.info_group.cover) {
      this.cover= this.info_group.cover.url +"";
    }
    this.is_admin = response.data.admin;
    this.events = response.data.events;
    this.member_total = response.data.member_total;
    this.event_total = response.data.event_total;
    this.id_member_group = response.data.id_membered_group;
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
    if (this.status_user == 2){
    this.groupSevice.joinGroup(this.current_user.authentication_token,this.id_group).
      subscribe(response => this.onJoinGroupSuccess(response))
    } else {
      if (this.status_user == 1 || this.status_user == 0){
        this.groupSevice.cancelJoinGroup(this.current_user.authentication_token,this.id_member_group).
        subscribe(response => this.onJoinGroupSuccess(response))
      }
    }
  }

  onJoinGroupSuccess(response){
    this.getGroupThumbnail();
    console.log("want join");
  }

  onChange(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = this.changeImage.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  changeImage(e) {
    const image = <FileReader> e.target;
    const ava = {
      group: {
        cover: image.result
      }
    };
    const token = JSON.parse(localStorage.getItem('currentUser')).authentication_token;
    this.groupSevice.changeCover(ava, this.id_group, token).
      subscribe(response => this.onChangeSuccess(response, image),
      response => this.onChangeError());
  }

  onChangeSuccess(response, image) {
    this.router.navigate(['/groups',this.id_group])
  }

  onChangeError() {
    $("#coverGroupChange").modal("hide");
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(${image})`);
}
}
