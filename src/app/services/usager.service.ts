import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usager } from '../interfaces/usager';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsagerService {
  constructor(private http: HttpClient) { }
  connection(user:User): Observable<any> {
    const base64Credentials = btoa(user.username + ':' + user.password);
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + base64Credentials,
      'Content-Type': 'application/json;charset=UTF-8',
     
    });
    return this.http.post('https://livelearn.nl/wp-json/wp/v2/users/me',{}, { headers });
  }

  inscription(usager: Usager): Observable<any> {
    const base64Credentials = btoa(" testapp@livelearn.nl " + ':' + "Test123456@!");
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + base64Credentials,
      'Content-Type': 'application/json;charset=UTF-8',
     
    });
    const requestBody = {
      email:usager.email,
      password: usager.password,
      first_name: usager.firstName,
      last_name: usager.lastName,
      name:usager.name,
      username:usager. username,
      roles: ["subscriber"]
    };    
    return this.http.post<Usager>(" https://livelearn.nl/wp-json/wp/v2/users", requestBody, { headers });
  }
 
  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
