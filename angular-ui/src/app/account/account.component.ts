import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  constructor(
    private router: Router,
    private accountService: AccountService
  ) {
    if (this.accountService.isLoogedIn) {
      this.router.navigate(['/']);
    }
  }
}
