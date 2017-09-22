import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from './profile.service';
import { User } from './user';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ProfileService],
})
export class ProfileComponent implements OnInit {

  user_id: any;
  public currentUser: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
  ) { }

  ngOnInit() {
    this.getDataUser();
    $(document).ready(function(e) {
    $('.form').find('input, textarea').on('keyup blur focus', function (e) {
    var $this = $(this),
        label = $this.prev('label');

        if (e.type === 'keyup') {
          if ($this.val() === '') {
            label.removeClass('active highlight');
          } else {
            label.addClass('active highlight');
          }
      } else if (e.type === 'blur') {
        if( $this.val() === '' ) {
          label.removeClass('active highlight'); 
        } else {
          label.removeClass('highlight');   
        }   
      } else if (e.type === 'focus') {
        if( $this.val() === '' ) {
          label.removeClass('highlight'); 
        } 
        else if( $this.val() !== '' ) {
          label.addClass('highlight');
        }
      }
    });
    $('.tab a').on('click', function (e) {
    e.preventDefault();
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    });
    $('#menu_icon').click(function(){
      if($("#content_details").hasClass('drop_menu'))
      {
          $("#content_details").addClass('drop_menu1').removeClass('drop_menu');
      }
      else{
        $("#content_details").addClass('drop_menu').removeClass('drop_menu1');
        }
    });
      $("#flip").click(function(){
          $("#panel").slideToggle("5000");
      });
    $(window).scroll(function(){
      if ($(window).scrollTop() >= 500) {
        $('nav').addClass('stick');
      }
      else {
        $('nav').removeClass('stick');
      }
    });
    });
  }

getDataUser(){
  this.user_id = +this.route.snapshot.params['id'];
  this.profileService.getInfoUser(this.user_id).subscribe(
    (user) => {
      this.currentUser = user;
      console.log(this.currentUser.typeof)
    },
    response => this.onError,
  )
}

onNextGetInfo(response){
  const data = response.data.user;
  // this.currentUser = new User(data.id, data.name, data.email, data.avatar, data.number_phone,
  //   data.birthday, data.address, data.country, data.id_number, data.link_facebook, data.workplace);
  
}

onError() {
  this.router.navigate(['']);
}

}
