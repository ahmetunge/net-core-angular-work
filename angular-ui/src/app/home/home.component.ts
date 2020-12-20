import { Component } from '@angular/core';
import { AccountService } from '../account/account.service';
import { User } from '../shared/models/user';


@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  user: User;

  constructor(private accountService: AccountService) {
    this.user = this.accountService.userValue;
  }

}
