import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root'
})


export class CommonService {

  accessToken : any;
  refreshToken :any;

  constructor(
     private http: HttpClient,
     private router: Router,
     private jwtHelper: JwtHelperService
     ) { }

  login(payload: any): Observable<any> {
    let head = new HttpHeaders();
    head.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/user/login', payload)
  }

  register(payload: any): Observable<any> {

    return this.http.post('http://localhost:3000/api/user/register', payload);
  }

  

  getTickets(): Observable<any> {
    var t = this.accessToken;
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + t
    });
    return this.http.get('http://localhost:3000/api/tickets', { headers: headers_object, observe: 'response' })
  }

  errorResponse(err : any) {
    if (err.error instanceof Error) {
      //A client-side or network error occurred.
      console.log('An error occurred:', err.error.message);
    } else {
      //Backend returns unsuccessful response codes such as 404, 500 etc.
      console.log('Backend returned status code: ', err.status);
      console.log('Response body:', err.error);
    }
  }

  addNewTicket(payload: any): any {
    var t = localStorage.getItem("app-accessToken")
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + t
    });
    return this.http.post('http://localhost:3000/api/tickets/create', payload, { headers: headers_object, observe: 'response' })

  }

  getTicketsbyPromise(): any {
    var t = localStorage.getItem("app-accessToken")
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + t
    });
    return this.http.get('http://localhost:3000/api/tickets', { headers: headers_object }).toPromise()
  }

  loggedIn() {
    return !!localStorage.getItem('app-accessToken');
  }
  logoutUser() {
    localStorage.removeItem("app-accessToken");
    localStorage.removeItem("app-refreshToken");
    this.accessToken = null;
    this.refreshToken = null;
    Swal.fire("Logged out !")
    this.router.navigate(['/login']);

    return this.loggedIn();
  }

  getCurrentUserRole(){
    const token = this.jwtHelper.decodeToken(this.accessToken);
    return token.role;
  }
  
  getTicketsbyId(id:any){
    var t = localStorage.getItem("app-accessToken")
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + t
    });
    return this.http.get('http://localhost:3000/api/tickets?id='+id, { headers: headers_object, observe: 'response' })
  }


}
