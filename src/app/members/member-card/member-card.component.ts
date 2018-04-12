import { Component, Input, OnInit } from '@angular/core';
import { Users } from '../../_models/User';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user: Users;

  constructor() { }

  ngOnInit() {
  }

}
