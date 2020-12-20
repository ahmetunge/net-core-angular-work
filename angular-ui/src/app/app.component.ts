import { Component } from '@angular/core';
import { AccountService } from './account/account.service';
import { User } from './shared/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User | undefined;
  isLoggedIn = false;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
    this.isLoggedIn = this.accountService.isLoogedIn;
  }

  logout(): void {
    this.accountService.logout();
  }
}
