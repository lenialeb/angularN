import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { NgIf } from '@angular/common';
import { CartService } from '../../../services/product/cart.service';

@Component({
  selector: 'app-category-navbar',
  imports: [RouterLink,NgIf,RouterModule],
  templateUrl: './category-navbar.component.html',
  styleUrl: './category-navbar.component.css'
})
export class CategoryNavbarComponent {
  username: string | null = null;
  role:string= '';
  router= inject(Router);
  constructor(private userService: UserService,private cartService: CartService) {
 
   
  }
  ngOnInit(): void {
    this.username = this.userService.getUsernameFromToken();
    console.log('Username:', this.username); 
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
    console.log("decodedtoken",decodedToken)
    this.role = decodedToken.role;
    console.log("role of the logged",this.role)
 

  }
  logout(): void {
   
    localStorage.removeItem('token');
    this.cartService.clearCart();
    this.username = null; 
    this.router.navigate(['/login']).then(() => {
      window.history.replaceState({}, document.title, '/login'); 
    }); 
  }
 get cartItemsCount(): number {
   return this.cartService.getTotalItems()
  }
}
