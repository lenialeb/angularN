import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../user.service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
interface User {
  id: string;
  name: string;
  username: string;
}
@Component({
  selector: 'app-user-list',
  imports: [RouterLink,NgFor,FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
userList: User []=[]
currentPage=1;
pageSize=6;
Search={
  searchTerm:''
}
filteredUser : User[]=[]
constructor (private userService:UserService){}
ngOnInit(){
  this.fetchUsers()
}
fetchUsers(){
  this.userService.getUsers().subscribe((res:any)=>{
    this.userList=res;
    this.filteredUser=res;
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
}
get paginatedUser() {
  const start = (this.currentPage - 1) * this.pageSize;
  return this.filteredUser.slice(start, start + this.pageSize);
}

totalPages() {
  return Math.ceil(this.filteredUser.length / this.pageSize);
}

changePage(page: number) {
  if (page >= 1 && page <= this.totalPages()) {
    this.currentPage = page;
  }
}
search(){
  this.currentPage = 1; // Reset to the first page on search
    console.log('Current search term:', this.Search.searchTerm);
  
    this.filteredUser = this.userList.filter(user => {
      const match = user.name.toLowerCase().includes(this.Search.searchTerm.toLowerCase());
      console.log(`Product: ${user.name}, Match: ${match}`);
      return match;
    });
}}
