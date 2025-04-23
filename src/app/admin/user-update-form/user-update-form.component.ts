import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
interface User{
  id:string;
  name:string;
  username:string;
  password:string;
  role:string;
}
@Component({
  selector: 'app-user-update-form',
  imports: [FormsModule],
  templateUrl: './user-update-form.component.html',
  styleUrl: './user-update-form.component.css'
})
export class UserUpdateFormComponent {
 
  user: User = { id: '', name: '', username: '',password:'',role:'' };
router=inject(Router);
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    console.log("userID from route:", userId); // Log the product ID to the console

    if (userId) {
      this.userService.getUserById(userId).subscribe((data: User[]) => { // Expect array response
        if (data.length > 0) {
          this.user = data[0]; // Assign the first product in the array to the product object
          console.log("Fetched product data:", this.user); // Log the product data to the console
        } else {
          console.error("No product found in the response.");
        }
      }, (error: any) => {
        console.error("Error fetching product:", error);
      });
    } else {
      console.error("No product ID found in route parameters.");
    }
  }

  save() {
    // Logic to save the updated product
    
    this.userService.updateUser(this.user.id, { name: this.user.name, password:this.user.password, username: this.user.username }).subscribe(() => {
      console.log('Product updated successfully');
      this.router.navigateByUrl('admin');
      // Optionally redirect or show a success message
    });
  }
}


