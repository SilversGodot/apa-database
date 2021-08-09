import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WebService } from '../web.service';
import User from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
    @Output() updateLoginInfo: EventEmitter<object> = new EventEmitter();

    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private webService: WebService
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('userInfo')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    public isAuthenticated() : Boolean {
        let userData = localStorage.getItem('userInfo');

        if(userData && JSON.parse(userData)) {
            return true;
        }
        return false;
    }

    public setUserInfo(user: User){
        localStorage.setItem('userInfo', JSON.stringify(user));
        this.updateLoginInfo.emit({ 'username': user.username });
    }

    public validate(username: string, password: string) {
        return this.webService.post<User>('signin', {'username' : username, 'password' : password}).toPromise()
    }
}