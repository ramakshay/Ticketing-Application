import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.css']
})
export class TicketViewComponent implements OnInit {

  ticketId : any;
  ticket : any;

  constructor(private router : Router, private route: ActivatedRoute,
    private cService: CommonService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      this.ticketId = params.get("id")
      console.log(this.ticketId);
      this.getTicketDetailsbyId()
    })
  }

  getTicketDetailsbyId(){
    this.cService.getTicketsbyId(this.ticketId).subscribe( res => {
      this.ticket = res;
      this.ticket = this.ticket.body.tickets
      console.log(this.ticket);
    })
  }

}
