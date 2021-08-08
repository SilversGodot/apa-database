import { Component, OnInit } from '@angular/core';
import { AccountService } from '@app/services/account.service';
import User from '@app/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Auricular Point Acupressure';
  isAuthenticated = false;
  user: User;

  constructor(private accountService: AccountService){
    this.user = this.accountService.userValue;
  }

  ngOnInit(): void {
    if(this.user) {
      this.isAuthenticated = true;
    }
  }

  async logout(): Promise<void> {
    // todo
  }
}
