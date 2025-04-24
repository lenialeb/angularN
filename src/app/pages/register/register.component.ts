import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule,RouterModule,NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
userObj: any = {
  name: '',
  username: '',
  password: '',
  role:null
};
errorMessage: string | null = null; 
successMessage: string | null = null;
router= inject(Router);
constructor(private userService:UserService) {}
register(){
  this.userService.register(this.userObj).subscribe((res:any)=>{
    console.log(res.message)
    this.successMessage=res.message
    console.log("Success Message:", this.successMessage); // Log the success message

    // Clear previous error messages
    this.errorMessage = null; 

    // Optionally, you can set a timeout to clear the success message after a few seconds
    setTimeout(() => {
      this.successMessage = null; // Clear success message after a delay
      this.router.navigate(['/login']); // Redirect after a short delay
    }, 2000);
  },(error)=>{
    if (error.error && typeof error.error === 'string') {
      const parsedError = JSON.parse(error.error);
      this.errorMessage = parsedError.message || "An unexpected error occurred.";
    } else if (error.error && error.error.message) {
      this.errorMessage = error.error.message; // Custom error message
    } else {
      this.errorMessage = "An unexpected error occurred."; 
    }
    this.successMessage = null;
   })
}
role(event: Event): void {
  const target = event.target as HTMLSelectElement; 
  
  this.userObj.role =  target.value; 
  
}
}
