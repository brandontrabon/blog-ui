import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SessionService } from './session.service';
import { ServiceBase } from './service.base';
import { map } from 'rxjs/internal/operators';

export interface AuthResponse {
  token: string;
  roles: string[];
}

export interface UserRequest {
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  username: string;
  password: string;
}

export interface UserResponse extends UserRequest {
  app_user_id: number;
}

@Injectable()
export class AuthService extends ServiceBase implements CanActivate {
  constructor(private http: HttpClient, private router: Router, private sessionService: SessionService) {
    super();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.sessionService.isAdmin;
  }

  login(username: string, password: string): Observable<AuthResponse> {
    const data = { username, password };
    const url = this.createUrl('auth/login');

    return this.http.post(url, data).pipe(
      map((response: AuthResponse) => {
        this.sessionService.token = response.token;
        this.sessionService.isAdmin = response.roles.indexOf('ADMIN') > -1;

        return response;
      })
    );
  }

  registerUser(user: UserRequest) {
    const data = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      username: user.username,
      password: user.password
    };
    const url = this.createUrl('auth/registration');

    return this.http.post(url, data).pipe(
      map((response: UserResponse) => {
        return response;
      })
    );
  }

  isAdmin(): boolean {
    return this.sessionService.isAdmin;
  }
}
