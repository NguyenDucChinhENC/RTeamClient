import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service'

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css'],
  providers: [GroupService]
})
export class NewGroupComponent implements OnInit {

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    $(document).ready(function () {
      $(".btn-select").each(function (e) {
          var value = $(this).find("ul li.selected").html();
          if (value != undefined) {
              $(this).find(".btn-select-input").val(value);
              $(this).find(".btn-select-value").html(value);
          }
      });
  });
  
  $(document).on('click', '.btn-select', function (e) {
      e.preventDefault();
      var ul = $(this).find("ul");
      if ($(this).hasClass("active")) {
          if (ul.find("li").is(e.target)) {
              var target = $(e.target);
              target.addClass("selected").siblings().removeClass("selected");
              var value = target.html();
              $(this).find(".btn-select-input").val(value);
              $(this).find(".btn-select-value").html(value);
          }
          ul.hide();
          $(this).removeClass("active");
      }
      else {
          $('.btn-select').not(this).each(function () {
              $(this).removeClass("active").find("ul").hide();
          });
          ul.slideDown(300);
          $(this).addClass("active");
      }
  });
  
  $(document).on('click', function (e) {
      var target = $(e.target).closest(".btn-select");
      if (!target.length) {
          $(".btn-select").removeClass("active").find("ul").hide();
      }
  });
  }

  onClickButtonNewGroup(value: any){
    let current_user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(current_user.authentication_token);
    this.groupService.newGroup(current_user.authentication_token, value).subscribe(response => this.success(response),
    response => this.error(response) );
  }

  success(response){
    console.log(response)
  }

  error(response){
    console.log(response)
  }
}
