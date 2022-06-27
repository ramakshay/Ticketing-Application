import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }
  dashboard() {
    this.router.navigate(['dashboard'], {relativeTo:this.route});
  }
  tickets() {
    this.router.navigate(['tickets'], {relativeTo:this.route});
  }
  users() {
    this.router.navigate(['users'], {relativeTo:this.route});
  }
}
