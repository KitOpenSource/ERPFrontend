import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUserUrl = 'http://localhost:3000/users/login';

  constructor(private http:HttpClient) { }

  loginUser(loginUser: any) {
    const loginInfo = {
      username: loginUser?.username,
      password: loginUser?.password
    }
    return this.http.post(this.loginUserUrl, loginInfo);
  }

  checkTokenExpired():boolean {
    const token:any = localStorage?.getItem('token');
    if (token) {
      const tokenInfo:any = jwt_decode(token);
        if (tokenInfo) {
          const expiry = tokenInfo.exp;
          return (Math.floor((new Date).getTime() / 1000)) >= expiry;
        } else {
          return true;
        }
    } else {
      return true;
    }
  }
}
