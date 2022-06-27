import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(
    private router: Router,
    public commonService:CommonService) { }
  loginform: FormGroup;

  ngOnInit(): void {
    this.loginform =  new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  public login:any;
  onSubmit() {
      console.log("User Registration Form Submit", this.loginform.value);
      let payload = this.loginform.value;
      this.commonService.login(payload)
      .subscribe( res => 
        {
          console.log(res);
          this.commonService.accessToken = res.accessToken;
          this.commonService.refreshToken = res.refreshToken;
          localStorage.setItem("app-accessToken",res.accessToken);
          localStorage.setItem("app-refreshToken",res.refreshToken);
          this.router.navigate(['/home']);
        },
        (error) => {                  
          Swal.fire("Oops !",error.error,"error");
        });
  }
}
