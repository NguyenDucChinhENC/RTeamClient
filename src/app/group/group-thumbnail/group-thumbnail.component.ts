import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { ActivatedRoute , Router } from '@angular/router';

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

  constructor(
    private groupSevice: GroupService,
    private route: ActivatedRoute,
    private router: Router) { }

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
  }

  onErrorGetGroupInfo(){
    this.router.navigate(['/']);
  }
}
