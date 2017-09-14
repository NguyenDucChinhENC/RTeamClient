import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css'],
  providers: [LoginService]
})
export class StartPageComponent implements OnInit {

  private User: any = {};
  private User_info: any = {};

  constructor(public loginService: LoginService) {
  }

  ngOnInit() {
    $(document).ready(function(){
      var formInputs = $('input[type="email"],input[type="password"]');
      formInputs.focus(function() {
           $(this).parent().children('p.formLabel').addClass('formTop');
           $('div#formWrapper').addClass('darken-bg');
           $('div.logo').addClass('logo-active');
      });
      formInputs.focusout(function() {
        $('div#formWrapper').removeClass('darken-bg');
        $('div.logo').removeClass('logo-active');
      });
      $('p.formLabel').click(function(){
         $(this).parent().children('.form-style').focus();
      });
    });
  }

  onNext(response) {
    if (response.status === 200) {
      this.User = JSON.parse(response._body);
      this.User_info = this.User.data.user_info;
      localStorage.setItem('currentUser', JSON.stringify(this.User_info));
      window.location.reload();
    }
  };

  onError(response) {
    console.log(response);
    if (response) {
      alert('invalid email or password !');
    }
  };

  onSubmit(value: any) {
    this.loginService.login(value).subscribe(
      response => this.onNext(response),
      response => this.onError(response)
    );
  }
}
