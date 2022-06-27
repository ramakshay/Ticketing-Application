import { Component, OnInit, Input , Output, EventEmitter } from '@angular/core';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-ticket-status',
  templateUrl: './ticket-status.component.html',
  styleUrls: ['./ticket-status.component.css']
})
export class TicketStatusComponent implements OnInit {

  @Input() title:any;

  @Output() message  = new EventEmitter()

  getTicketObservable: any;
  tickets: any;
  public totalTickets = 0;
  public startTickets = 0;
  public inProgressTickets = 0;
  public completedTickets = 0;


  constructor( private _cservice : CommonService) { }

  ngOnInit(): void {

    this.getTicketObservable = this._cservice.getTickets().subscribe((res : any) => {
      console.log(res);
      this.tickets = res.body.tickets;
      console.log(this.tickets)
      this.countTickets();
    })
  }

  countTickets() {
    this.totalTickets = this.tickets.length;
    for( let i=0 ; i<this.totalTickets ; i++ ){
      if(this.tickets[i].status == "start"){
        this.startTickets += 1;
      }
      if(this.tickets[i].status == "inprogress"){
        this.inProgressTickets += 1;
      }
      if(this.tickets[i].status == "completed"){
        this.completedTickets += 1;
      }
    }
  }

  transferData() {
    var data = {
      'tickets':this.tickets,
    }
    this.message.emit(data)
  }

}
