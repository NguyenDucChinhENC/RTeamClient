import { Component, OnInit } from '@angular/core';
import { SignUpService } from './sign-up.service';
import { LoginService } from '../login.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [SignUpService, LoginService],
})
export class SignUpComponent implements OnInit {

  private User: any = {};
  private User_info: any = {};


  constructor(
    private signupService: SignUpService,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    $(document).ready(function() {
      var navListItems = $('ul.setup-panel li a'),
        allWells = $('.setup-content');

      allWells.hide();

      navListItems.click(function(e)
        {
          e.preventDefault();
          var $target = $($(this).attr('href')),
            $item = $(this).closest('li');
        
          if (!$item.hasClass('disabled')) {
            navListItems.closest('li').removeClass('active');
            $item.addClass('active');
            allWells.hide();
            $target.show();
          }
      });
    
    $('ul.setup-panel li.active a').trigger('click');
    
    $('#activate-step-2').on('click', function(e) {
      $('ul.setup-panel li:eq(1)').removeClass('disabled');
      $('ul.setup-panel li a[href="#step-2"]').trigger('click');
    })
    
    $('#activate-step-3').on('click', function(e) {
      $('ul.setup-panel li:eq(2)').removeClass('disabled');
      $('ul.setup-panel li a[href="#step-3"]').trigger('click');
    })
    
    $('#activate-step-4').on('click', function(e) {
      $('ul.setup-panel li:eq(3)').removeClass('disabled');
      $('ul.setup-panel li a[href="#step-4"]').trigger('click');
    })
    
    $('#activate-step-3').on('click', function(e) {
      $('ul.setup-panel li:eq(2)').removeClass('disabled');
      $('ul.setup-panel li a[href="#step-3"]').trigger('click');
    })
    });
  }

  onSignupSubmit(value: any) {
    this.signupService.signup(value).subscribe(
      response => this.onNext(response,value),
      response => this.onError(response),
    )
  }

  onNext(response, value: any) {
    console.log("ok");
    this.signin(value);
  }

  onError(response) {
    console.log("dm");
  }

  signin(value: any){
    console.log(value);
    // this.loginService.login(value).subscribe(
    //   response => this.signinSuccess(response),
    //   response => this.signinError(),
    // )
  }

  signinSuccess(response){
    if (response.status === 200 ){
      this.User = JSON.parse(response._body);
      this.User_info = this.User.data.user_info;
      if (localStorage.currentUser){
        localStorage.removeItem('currentUser');
      }
      localStorage.setItem('currentUser', JSON.stringify(this.User_info));
      window.location.reload();
    }
  }

  signinError(){
    console.log("dmm");
  }

}
