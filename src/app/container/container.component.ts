import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
connected=true;
register=false
  constructor(private router: Router,private location:Location) { }

  ngOnInit(): void {
  }
  redirectToRegister() {
    this.connected=false;
    this.register=true;
    this.router.navigate(['/container']);
  }
  back(): void {
    this.location.back();
  }
}
