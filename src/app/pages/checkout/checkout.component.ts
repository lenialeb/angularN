import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../cart.service';
import { CheckOutService } from '../../check-out.service';
import { Router } from '@angular/router';
import { PaymentService } from '../../payment.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  totalAmount: number = 0;
  // stripePromise = loadStripe('pk_test_51R8yLnQhPwxNWUitaG5e8VSyX6GxhRbARlMnGDls6Zn6C9nMIvxJjwrXGXoPCFH8WGqmmqKDg5swbCDMKhSKVfLT004R8VDTxD'); 
  orderDetails: any[] | undefined; // Array to hold cart items
  order = {
    name: '',
    email: '',
    address: '',
    phone:'',
    city:'',
    postalCode:'',
    orderDetail: '',
  };
  id: string | null = null;
  constructor(
    private cartService: CartService,
    private checkoutService: CheckOutService,
    private userService:UserService,
    private paymentService:PaymentService,
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
    this.order.name = decodedToken.sub;
 // Provide a fallback value if null
     // Get username from token

    // Fetch cart items
    this.cartService.getCartItems().subscribe((items: any[]) => {
        this.orderDetails = items;
        this.order.orderDetail = JSON.stringify(this.orderDetails); 
        // Initialize orderDetail
    });
    this.totalAmount =   this.cartService.getTotal()
    console.log("total is",this.totalAmount)
    this.id = this.userService.getidFromToken();
    console.log('id from token is:', this.id); 

}
paymentData={
  id:this.id,
  totalAmount:this.totalAmount
}
async placeOrder() {
  const token = localStorage.getItem('jwtToken');
  // const stripe = await this.stripePromise;
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
          this.cartService.clearCart();
           // Clear cart after successful order
      },
      (error: any) => {
          console.error('Error placing order:', error);
          alert(`There was an error placing your order: ${error.error?.error || 'Please try again later.'}`);
      }
  );

}
pay() {
  this.placeOrder();
  this.paymentData = {
    id: this.userService.getidFromToken(), // Get the latest ID
    totalAmount: this.cartService.getTotal() // Get the latest total amount
};
console.log("payment data",this.paymentData)
  this.paymentService.payment(JSON.stringify(this.paymentData)).subscribe(
    
    (response: any) => {
        console.log('Payment response:', response);
        const checkoutUrl = response.checkoutUrl; // Use the checkout URL from the response
        window.location.href = checkoutUrl;
      
        // Handle successful payment response, like redirecting to payment URL
    },
    
    (error: any) => {
        console.error('Payment error:', error);
        alert(`Payment failed: ${error.error?.message || 'Please try again later.'}`);
    }
  );
}
}