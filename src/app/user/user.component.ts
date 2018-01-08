import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from './profile.service';
import { User } from './user';
import { IMG_URL } from '../constants';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
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
        if (this.currentUser.avatar) {
          this.currentUser.avatar = IMG_URL + this.currentUser.avatar;
        }
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

  onClickUpdate(value: any){
    console.log(value);
    const token = JSON.parse(localStorage.getItem('currentUser')).authentication_token;
    this.profileService.updateUser(value, this.user_id, token).subscribe(
      response => this.onNext_update(response),
      response => this.onError_update(response)
    )
  }

  onNext_update(response){
    console.log(response)
  }

  onError_update(response){
    console.log(response)
  }

  chooseImage(id: string) {
    $(id).trigger('click');
  }

  onChange(e) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = this.changeImage.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  changeImage(e) {
    const image = <FileReader> e.target;
    const ava = {
      user: {
        avatar: image.result
      }
    };
    const token = JSON.parse(localStorage.getItem('currentUser')).authentication_token;
    this.profileService.changeAvatar(ava, this.user_id, token).
      subscribe(response => this.onChangeSuccess(response, image),
      response => this.onChangeError());
  }

  onChangeSuccess(response, image) {
    this.router.navigate(['/user', this.user_id]);
  }

  onChangeError() {
  
  }

  onClickLogout(){
    this.profileService.logout(JSON.parse(localStorage.currentUser).authentication_token).subscribe(
      response => this.onNext(response),
      response => this.onErrorLogout(response)
    )
  }

  onNext(response){
    localStorage.removeItem('currentUser');
    window.location.reload()
  }

  onErrorLogout(response){
    localStorage.removeItem('currentUser');
    window.location.reload()
  }

}
