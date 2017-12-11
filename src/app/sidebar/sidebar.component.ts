import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoutService } from './logout.service'

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'groups', title: 'Group',  icon:'pe-7s-note2', class: '' },
    { path: 'typography', title: 'Typography',  icon:'pe-7s-news-paper', class: '' },
    { path: 'icons', title: 'Icons',  icon:'pe-7s-science', class: '' },
    { path: 'maps', title: 'Maps',  icon:'pe-7s-map-marker', class: '' },
    { path: 'notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '' },
    { path: 'upgrade', title: 'hihi',  icon:'pe-7s-rocket', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  providers: [LogoutService]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  public User: any;
  
  constructor(private logoutService: LogoutService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    if (localStorage.currentUser){
      this.User = JSON.parse(localStorage.currentUser);
    }
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

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
    localStorage.removeItem('currentUser');
    window.location.reload()
  }
}
