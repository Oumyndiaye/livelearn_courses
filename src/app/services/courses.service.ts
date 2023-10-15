import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }
  getAllCourses():Observable<any> {
       const token = localStorage.getItem('token');
       const headers = new HttpHeaders({
         'Authorization': 'Basic ' + token,
         'Content-Type': 'application/json;charset=UTF-8',
        
       });
    return this.http.get( "https://livelearn.nl/wp-json/custom/v1/all_courses",{headers});
  }
}
