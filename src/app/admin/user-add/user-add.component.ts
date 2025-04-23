import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-add',
  imports: [FormsModule,],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css'
})
export class UserAddComponent {
 user ={
    name:'',
    username:'',
    password:'',
    role:''
 }
ngOnInit(): void {
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
    this.user.role = decodedToken.role;
    if (this.user.role!== 'admin') {
      alert("Access denied")
      this.router.navigate(['/layout/home']); // Redirect to access denied page
    }
  
}
 router=inject(Router)
constructor(private userService:UserService){}
addUser(){
  this.userService.register(this.user).subscribe((res:any)=>{
    console.log("User added successfully",res);
    alert("User added successfully");
this.router.navigateByUrl('/layout/admin')
  }, (error) => {
    console.error("Product addition failed", error);
  })
}

role(event: Event): void {
  const target = event.target as HTMLSelectElement; 
  
  this.user.role =  target.value; 
  
}
}
