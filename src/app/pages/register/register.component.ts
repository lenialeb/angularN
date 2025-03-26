import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../user.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
userObj: any = {
  name: '',
  username: '',
  password: ''
};
router= inject(Router);
constructor(private userService:UserService) {}
register(){
  this.userService.register(this.userObj).subscribe((res:any)=>{
    console.log("Registered successfully",res);
    this.router.navigateByUrl("login");
  },(error)=>{
    console.error("Registration failed",error);
  })
}

}
