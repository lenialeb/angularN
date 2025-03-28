import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../cart.service';
import { CheckOutService } from '../../check-out.service';

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

  constructor(private cartService: CartService, private checkoutService: CheckOutService) {}

  ngOnInit() {
    // Retrieve the user's name from local storage
    const token = localStorage.getItem('jwtToken'); // Adjust the key as necessary
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode token to get user details
      this.order.name = decodedToken.sub; // Get username from token (adjust as needed)
    }

    // Fetch cart items
    this.cartService.getCartItems().subscribe((items: any[]) => {
      this.orderDetails = items;
      this.order.orderDetail = JSON.stringify(this.orderDetails); // Initialize orderDetail
    });
  }

  placeOrder() {
    // Ensure email and address are provided
    if (!this.order.email || !this.order.address) {
      alert('Please provide your email and address.');
      return;
    }

    this.checkoutService.checkout(this.order).subscribe(
      (response: any) => {
        console.log(response);
        alert('Order placed successfully');
        this.cartService.clearCart(); // Clear cart after successful order
      },
      (error: any) => {
        console.error('Error placing order:', error);
        alert('There was an error placing your order. Please try again later.');
      }
    );
  }
}