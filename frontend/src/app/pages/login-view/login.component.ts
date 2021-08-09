import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

import { AccountService } from '@app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  returnUrl: string;
  submitted = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) { 
      return;
    }

    this.loading = true;
    this.accountService.validate(this.f.username.value, this.f.password.value)
      .then((response) => {
        var decoded = jwt_decode(response.token);
        var jwtToken = JSON.parse(JSON.stringify(decoded));

        response.id = jwtToken.sub;
        response.username = jwtToken.user.username;
        response.role = jwtToken.user.role;

        this.accountService.setUserInfo(response);
        this.router.navigate([this.returnUrl]);
      });
  }
}