import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../interfaces/course';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-table-courses',
  templateUrl: './table-courses.component.html',
  styleUrls: ['./table-courses.component.css']
})
export class TableCoursesComponent implements OnInit {
 @Input() courses:Course [] | any;
 page: number = 1;
 sizeCourses:number=0;
 course!:Course;
 public config: PaginationInstance = {
  id: 'custom',
  itemsPerPage: 4,
  currentPage: 1
};
currentPage: number = 1;
itemsPerPage: number = 12;
  constructor() { }

  ngOnInit(): void {
  }
  chunkArray(arr: any[], chunkSize: number): any[] {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  }
  
  onTableDataChange(event: any) {
    this.page = event;
  }

  

}
