import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LogoutService } from './logout.service';

@Component({
    // moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html',
    providers: [LogoutService]
})

export class NavbarComponent implements OnInit{
    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    public User: any;

    constructor(location: Location,  private element: ElementRef, private logoutService: LogoutService) {
      this.location = location;
      this.sidebarVisible = false;    
      if (localStorage.currentUser){
        this.User = JSON.parse(localStorage.currentUser);
      }
    }

    ngOnInit(){
      this.listTitles = ROUTES.filter(listTitle => listTitle);
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      titlee = titlee.split('/').pop();
      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return 'Dashboard';
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

    back(){
      this.location.back()
    }
}
