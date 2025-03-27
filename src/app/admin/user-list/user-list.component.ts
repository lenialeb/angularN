import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../user.service';
import { NgFor } from '@angular/common';
interface User {
  id: string;
  name: string;
  username: string;
}
@Component({
  selector: 'app-user-list',
  imports: [RouterLink,NgFor],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
userList: User []=[]
constructor (private userService:UserService){}
ngOnInit(){
  this.fetchUsers()
}
fetchUsers(){
  this.userService.getUsers().subscribe((res:any)=>{
    this.userList=res;
    console.log('Fetched users:',this.userList);
  },error=>{
    console.error('Error fetching users:',error);    
  })
}
delete(id:string){
  this.userService.deleteUser(id).subscribe((res:any)=>{
    console.log("User deleted successfully",res);
    this.fetchUsers();
  },(error)=>{
    console.error("User deletion failed",error);
  })
}}
