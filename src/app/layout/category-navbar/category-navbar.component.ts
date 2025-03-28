import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../../user.service';
import { NgIf } from '@angular/common';
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-category-navbar',
  imports: [RouterLink,NgIf,RouterModule],
  templateUrl: './category-navbar.component.html',
  styleUrl: './category-navbar.component.css'
})
export class CategoryNavbarComponent {
  username: string | null = null;
  router= inject(Router);
  constructor(private userService: UserService,private cartService: CartService) {
 
   
  }
  ngOnInit(): void {
    this.username = this.userService.getUsernameFromToken();
    console.log('Username:', this.username); 
  }
  logout(): void {
   
    localStorage.removeItem('token');
    this.username = null; 
    this.router.navigate(['/login']).then(() => {
      window.history.replaceState({}, document.title, '/login'); 
    }); 
  }
 get cartItemsCount(): number {
   return this.cartService.getTotalItems()
  }
}
