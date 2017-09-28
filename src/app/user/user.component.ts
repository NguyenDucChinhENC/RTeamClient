import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from './profile.service';
import { User } from './user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [ProfileService],
})
export class UserComponent implements OnInit {
  user_id: any;
  public currentUser: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
  ) { }

  ngOnInit() {
    this.getDataUser();
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
