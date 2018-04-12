import { CommonModule } from '@angular/common';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/User.service';
import { Component, OnInit } from '@angular/core';
import { Users } from '../../_models/User';


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: Users[];
  constructor(private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadUsers();
  }
  loadUsers() {
    this.userService.getUsers().subscribe((users: Users[]) => {
      this.users = users;
    }, error => {
      this.alertify.error(error);
    })
  }
}
