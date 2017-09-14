import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoutService } from './logout.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [LogoutService]
})
export class HeaderComponent implements OnInit {

  public User: any;

  constructor(private logoutService: LogoutService) { }

  ngOnInit() {
    $(document).ready(function(){
      $(".dropdown").hover(            
          function() {
              $('.dropdown-menu', this).not('.in .dropdown-menu').stop( true, true ).slideDown("fast");
              $(this).toggleClass('open');        
          },
          function() {
              $('.dropdown-menu', this).not('.in .dropdown-menu').stop( true, true ).slideUp("fast");
              $(this).toggleClass('open');       
          }
      );
  });
    if (localStorage.currentUser){
      this.User = JSON.parse(localStorage.currentUser);
    }
  }

  onClickLogout(){
    this.logoutService.logout(JSON.parse(localStorage.currentUser).authentication_token).subscribe(
      response => this.onNext(response),
      response => this.onError(response)
    )
  }

  onNext(response){
    localStorage.removeItem('currentUser');
    window.location.reload()
  }

  onError(response){
    console.log("dm");
  }
}
