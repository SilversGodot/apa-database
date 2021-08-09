import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '@app/services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Auricular Point Acupressure';
  isAuthenticated = false;

  constructor(
    private route : Router,
    private accountService: AccountService) {
      accountService.updateLoginInfo.subscribe((userInfo) => {
        if(userInfo) {
          this.isAuthenticated = true;
        }
      });
  }

  ngOnInit(): void {
    this.isAuthenticated = this.accountService.isAuthenticated().valueOf();
  }

  async logout(): Promise<void> {
    console.log("logout");
    localStorage.removeItem("userInfo");
    this.isAuthenticated = false;
    this.route.navigate(['/login']);
  }
}