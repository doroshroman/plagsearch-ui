import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(this.url + 'login', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  loginWithGoogle(idToken: string): Observable<any>{
    return this.http.post(this.url + 'google_login', {
      id_token: idToken
    }, httpOptions);
  }

  register(user: any): Observable<any> {
    return this.http.post(this.url + 'register', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }


}
