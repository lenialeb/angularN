import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { error } from 'console';
import { UserService } from '../../user.service';


@Component({
  selector: 'app-login',
  imports:[FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // corrected 'styleUrl' to 'styleUrls'
})
export class LoginComponent {
  userObj: any = {
    username: '',
    password: ''
  };
   constructor(private userService: UserService) {}
  apiObj: any={
    "EmailId":'',
    "password":''
  }
router= inject(Router);
http=inject(HttpClient)
  login() {
    console.log("Attempting to log in...");
    if (this.userObj.username === "admin" && this.userObj.password === "1234") {
      console.log("Logged in");
      this.router.navigateByUrl("layout")
    } else {
      console.log("Cannot log in");
      alert("Invalid credentials");
    }
  }



loginApi(){
  
  this.userService.login(this.userObj.username, this.userObj.password).subscribe(
    (res: any) => {
      console.log("Login successful", res);
    if(res.token
    ) {
      localStorage.setItem('token', res.token);
      this.router.navigateByUrl("layout"); 
    }
    else {
      console.error("No token received");
    }
   
    },
    (error) => {
      console.error("Login failed", error);
    }
  );
  }
  navigate(){
    this.router.navigateByUrl("register");
  }

  
    }
