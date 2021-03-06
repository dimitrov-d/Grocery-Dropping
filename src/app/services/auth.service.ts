import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')) ||
        JSON.parse(sessionStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  register(user: User) {
    return this.http.post(`/user/register`, user);
  }

  login(email: string, password: string, remember: boolean) {
    return this.http
      .post<any>(`/user/login`, { email, password })
      .pipe(
        map((user) => {
          // Login successful if there's a jwt token in the response
          if (user && user.token) {
            if (remember) {
              localStorage.setItem('currentUser', JSON.stringify(user));
            } else {
              sessionStorage.setItem('currentUser', JSON.stringify(user));
            }
            this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');

    this.currentUserSubject.next(null);
  }

  getUsers() {
    return this.http.get<User[]>(`/users`);
  }

  deleteUser(user: User) {
    return this.http.delete(`/user/delete/` + user.email);
  }

  modifyUser(user: User) {
    return this.http.post(`/user/modify`, user);
  }
}
