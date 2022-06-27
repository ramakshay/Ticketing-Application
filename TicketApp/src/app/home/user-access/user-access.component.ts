import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/common.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.css']
})
export class UserAccessComponent implements OnInit {

  constructor(
    private http: HttpClient,
    public cService: CommonService) { }

  usersData:any = []
  hiddenValue:any ={}

  getUserData(): Observable<any> {
    var t = this.cService.accessToken;
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + t
    });
    return this.http.get('http://localhost:3000/api/user', { headers: headers_object, observe: 'response' })
  }

  changeUserRole(payload: any): Observable<any> {
    var t = this.cService.accessToken;
    let head = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + t
    });
    return this.http.post(
      'http://localhost:3000/api/user/changeRole',
      payload,
      { headers: head, observe: 'response' }
    );
  }


  ngOnInit(): void {
    this.getUserData().subscribe( res => {
      this.usersData = res.body.users;
      console.log(this.usersData)
    })
  }

  onSubmit(_id:any,event:any,i:any){
    var role = event.target.value;
    this.usersData[i].role = role;
    let data = {_id:_id,role:role};
    console.log(data);
    this.changeUserRole(data).subscribe( res => {
      console.log(res)
      //Swal.fire("User role update successfully !");
      Swal.fire('Done...', 'Role updated succesfully !', 'success')
    })

  }
  

}
