import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  imagetoUpload: any;

  constructor(
    private router: Router,
    public fb : FormBuilder,
    public commonService:CommonService
    ) { }
  signupForm: FormGroup;

  ngOnInit(): void {
    this.signupForm =  this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z ]*$')
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z ]*$')
      ]],
      email: ['', [
        Validators.required, 
        Validators.email
      ]],
      password: ['', [
        Validators.required
      ]],
      address: this.fb.group({
        street: ['',[
          Validators.required
        ]],
        pincode: ['',[
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
          Validators.pattern('^[0-9]*$')
        ]]
      }),
      phone: ['', [
        Validators.required
      ]],
      role: ['', [
        Validators.required
      ]],
      image: ['']
    });
  }

    get signupFormControls() : any {
      return this.signupForm.controls;
    }
    // get addressFormControls() : any {
    //   return this.signupForm.get('address').controls
    // }

  onSelectFile(event : any) {
    if (event.target.files && event.target.files[0]) {
        this.imagetoUpload = event.target.files[0];
        console.log(this.imagetoUpload)
        // this.signupForm.value.image = this.imagetoUpload;
    }
  }


  onSubmit() {
    console.log("User Registration Form Submit", this.signupForm.value);

    const formData = new FormData();
    formData.append('file', this.imagetoUpload);
    // formData.append('signupData',JSON.stringify(this.signupForm.value));
    formData.append('firstName',this.signupForm.value.firstName);
    formData.append('lastName',this.signupForm.value.lastName);
    formData.append('email',this.signupForm.value.email);
    formData.append('password',this.signupForm.value.password);
    formData.append('street',this.signupForm.value.address.street);
    formData.append('pincode',this.signupForm.value.address.pincode);
    formData.append('phone',this.signupForm.value.phone);
    formData.append('role',this.signupForm.value.role);

      this.commonService.register(formData)
      .subscribe( res => 
        {
          console.log(res);
          Swal.fire("Done","User successfully Registered!! Please Login","success");
          this.router.navigate(['/login']);
        });
  }

}
