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
 router=inject(Router)
constructor(private userService:UserService){}
addUser(){
  this.userService.register(this.user).subscribe((res:any)=>{
    console.log("User added successfully",res);
    alert("User added successfully");
this.router.navigateByUrl('admin')
  }, (error) => {
    console.error("Product addition failed", error);
  })
}

}
