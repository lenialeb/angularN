import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { error } from 'console';
import { UserService } from '../../../services/user/user.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-login',
  imports:[FormsModule,RouterModule,NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // corrected 'styleUrl' to 'styleUrls'
})
export class LoginComponent {
  userObj: any = {
    username: '',
    password: '',
    role:''
  };
  successMessage: any;
   constructor(private userService: UserService) {}
  apiObj: any={
    "EmailId":'',
    "password":'',
    
  }
  ngOnInit(){
    const token = localStorage.getItem('jwtToken');
    console.log("Token to check out:", token); // Log the token
  
    if (!token) {
        console.error('No JWT token found. Redirecting to login.');
        this.router.navigate(['/login']); // Redirect to login if no token
        return;
    }
   
    // Decode the token to get user details
    let decodedToken: any;
    if (token) {
      decodedToken = JSON.parse(atob(token.split('.')[1]));
    } else {
      console.error("Token is null or undefined");
      return;
    }
    this.userObj.role = decodedToken.role;
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
      this.successMessage=res.message
      console.log("Login successful", res);

    
      setTimeout(() => {
        this.successMessage = null;
        if(res.token
        ) {
          localStorage.setItem('token', res.token);
          
          const decodedToken = JSON.parse(atob(res.token.split('.')[1]));
          this.userObj.role = decodedToken.role;
          console.log("user role",this.userObj.role)
          if(this.userObj.role ==='admin'){
            this.router.navigateByUrl("layout/admin");  
          }
          else{this.router.navigateByUrl("layout/home"); }
        }
        else {
          console.error("No token received");
        }
      }, 1000);
   
   
    },
   
    (error: { error: { error: any; }; }) => {
      // Check if the error response contains a specific message
      if (error.error && error.error.error) {
        alert(error.error.error); 
      } else {
        alert("An unexpected error occurred. Please try again."); 
      }
      console.error("Login failed", error);
    }
  );
  }
  navigate(){
    this.router.navigateByUrl("register");
  }

  
    }
