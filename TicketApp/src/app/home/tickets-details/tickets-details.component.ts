import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-tickets-details',
  templateUrl: './tickets-details.component.html',
  styleUrls: ['./tickets-details.component.css']
})
export class TicketsDetailsComponent implements OnInit {

  modalRef : BsModalRef;

  constructor(
    private _cservice: CommonService,
    private fb: FormBuilder,
    private router: Router,
    private modalService: BsModalService) { }

  public p: number = 1;
  public ticketFlag = false;
  public tickets = [] as any;
  public getTicketObservable: any;
  ngOnInit(): void {

    //adding new ticket
    this.ticketForm = this.fb.group({
      ticketId: ["", Validators.required],
      ticketName: ["", Validators.required],
      description: ["", Validators.required],
      status: ["", Validators.required]
    });

    //Observable
    this.getTicketObservable = this._cservice.getTickets().subscribe((res: any) => {
      console.log(res);
      this.tickets = res.body.tickets;
      console.log(this.tickets.value)

    },(err: HttpErrorResponse) => {
      this._cservice.errorResponse(err);
    });

    

    //   //Promise
    //   this._cservice.getTicketsbyPromise().then((res:any) => {
    //     console.log(res);
    //     this.tickets=res.tickets;
    //   }).catch((err : any) => {
    //     console.log(err);
    //   })
    //   console.log("ng init")
  }
  

  ngOnDestroy() {
    try {
      this.ticketFlag = false;
      this.tickets = [];
      this.getTicketObservable.unsubscribe();
    }
    catch (err) {
      console.log('Observable not found', err);
    }
  }


  public ticketForm: any;

  flagTicket() {
    this.ticketFlag = true;
  }
  addTicket() {

    this.tickets.push(this.ticketForm.value);
    let payload = this.ticketForm.value;
    this._cservice.addNewTicket(payload)
      .subscribe((res: any) => {
        console.log(res)
        Swal.fire('Done...', 'Ticket added succesfully !', 'success')
      })

    this.ticketFlag = false;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
 }

}
