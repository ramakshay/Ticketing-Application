import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { TicketStatusComponent } from '../ticket-status/ticket-status.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,AfterViewInit {

  childTitle = 'Ticket Statistics';

  @ViewChild(TicketStatusComponent) ticketStatus : any;
  
  
  constructor(private router: Router, public _cservice:CommonService) { }

  ngOnInit(): void {
    console.log("dashboard");
    console.log(this._cservice.accessToken);
    
  }
  ngAfterViewInit(): void{
    console.log(this.ticketStatus.totalTickets);
  }

  receiveData(event : any){
    console.log(event)
  }



}
