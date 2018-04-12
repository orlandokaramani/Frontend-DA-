import { AlertifyService } from './../../_services/alertify.service';
import { UserService } from './../../_services/User.service';
import { Component, OnInit } from '@angular/core';
import { Users } from '../../_models/User';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: Users;

  constructor(private userService : UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loaduser();
  }

  loaduser(){
    this.userService.getUser(+this.route.snapshot.params['id']).subscribe((user: Users) => {
      this.user = user;
    }, error =>{
      this.alertify.error(error);
    });
  }

}
