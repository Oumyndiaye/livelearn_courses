import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { Course } from '../interfaces/course';

@Component({
  selector: 'app-couses',
  templateUrl: './couses.component.html',
  styleUrls: ['./couses.component.css']
})
export class CousesComponent implements OnInit {
  courses!: Course [] | any;
  sizeCourses!:number;
  constructor(private courseService:CoursesService) { }

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe((data:any)=>{
      this.courses = data.courses;
      this.sizeCourses=this.courses.length;     
    });
  }
}
