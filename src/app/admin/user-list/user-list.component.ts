import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
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
total=0;
totalPages=0;

  searchTerm: string = '';

filteredUser : User[]=[]
constructor (private userService:UserService){}
ngOnInit(){
  this.fetchUsers()
}

fetchUsers() {
  console.log('Fetching users...');
  this.userService.getUsersP(this.currentPage, this.pageSize, this.searchTerm).subscribe((res: any) => {
    console.log("in fetch methode search term",this.searchTerm)
    this.userList = res.users;
    this.total = res.total;
    this.totalPages = Math.ceil(res.total / this.pageSize);
    console.log('Fetched users:', this.userList);
  }, (error: any) => {
    console.error('Error fetching users:', error);
  });
}
delete(id:string){
  this.userService.deleteUser(id).subscribe((res:any)=>{
    console.log("User deleted successfully",res);
    this.fetchUsers();
  },(error: any)=>{
    console.error("User deletion failed",error);
  })
}
get paginatedUser() {
  const start = (this.currentPage - 1) * this.pageSize;
  return this.filteredUser.slice(start, start + this.pageSize);
}
nextPage() {      
if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.fetchUsers(); // Fetch products for the new page
}
}

previousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.fetchUsers();
  }
}


search() {
  this.currentPage = 1;
  console.log("search term",this.searchTerm) // Reset to first page on new search
  this.fetchUsers(); // Fetch users based on the search term
}
}