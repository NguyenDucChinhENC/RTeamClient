import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service'

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css'],
  providers: [GroupService]
})
export class GroupListComponent implements OnInit {

  current_user: any = {};
  list_groups: any[];
  list_groups_admin: any[];
  number_page: any;

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.getGroupList();
  }

  getGroupList(){
    this.current_user = JSON.parse(localStorage.getItem('currentUser'));
    this.groupService.getGroupList(this.current_user.authentication_token).
      subscribe(response => this.getListSuccess(response));
      this.number_page = 1;
  }

  getListSuccess(response){
    this.list_groups = response.data.groups;
    this.list_groups_admin = response.data.admin_groups;
  }

  getGroupListPage(page: any){
    if (page > 0){
      this.number_page=page;
      this.current_user = JSON.parse(localStorage.getItem('currentUser'));
      this.groupService.changPageLists(this.current_user.authentication_token, page).
      subscribe(response => this.getListSuccess(response));
    }
  }

}
