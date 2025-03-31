import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../cart.service';
import { CheckOutService } from '../../check-out.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  orderDetails: any[] | undefined; // Array to hold cart items
  order = {
    name: '',
    email: '',
    address: '',
    orderDetail: '',
  };

  constructor(
    private cartService: CartService,
    private checkoutService: CheckOutService,
    private router: Router
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('jwtToken');
    console.log("Token to check out:", token); // Log the token

    if (!token) {
        console.error('No JWT token found. Redirecting to login.');
        this.router.navigate(['/login']); // Redirect to login if no token
        return;
    }

    // Decode the token to get user details
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    this.order.name = decodedToken.sub; // Get username from token

    // Fetch cart items
    this.cartService.getCartItems().subscribe((items: any[]) => {
        this.orderDetails = items;
        this.order.orderDetail = JSON.stringify(this.orderDetails); // Initialize orderDetail
    });
}
placeOrder() {
  const token = localStorage.getItem('jwtToken');
  if (!token) {
      console.error('No JWT token found in local storage.');
      alert('You need to log in again.'); // Alert the user
      return; // Exit early if no token
  }

  if (!this.order.email || !this.order.address) {
      alert('Please provide your email and address.');
      return;
  }

  console.log('Token before placing order:', token); // Log the token
  console.log('Token parts:', token.split('.')); // Log the token parts

  this.checkoutService.checkout(this.order).subscribe(
      (response: any) => {
          console.log(response);
          alert('Order placed successfully');
          this.cartService.clearCart(); // Clear cart after successful order
      },
      (error: any) => {
          console.error('Error placing order:', error);
          alert(`There was an error placing your order: ${error.error?.error || 'Please try again later.'}`);
      }
  );
}
}