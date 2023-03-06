import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = "";
  password = "";
  errorMsg = "";
  submitting = false;

  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
    });
  
  constructor(public userService: AuthenticationService) { }

  ngOnInit() {
    this.userService.loginSubject.subscribe(x=>{
      if(x){ 
        window.location.href = "/confirmLoginSms"
      }else{
        this.errorMsg = "Login failed."
        this.submitting = false;
      }
    });
  
  }

  onSubmit() {
    this.submitting = true;
    this.userService.login(this.username, this.password);
  }

}
