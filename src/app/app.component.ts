import { Component, OnInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  private current_user;

  ngOnInit(){
    if (localStorage.getItem('currentUser')) {
      this.current_user = JSON.parse(localStorage.getItem('currentUser'));
      if (!sessionStorage.getItem('user_id')) {
        sessionStorage.setItem('user_id', this.current_user.id);
      }
    }
  }
}
