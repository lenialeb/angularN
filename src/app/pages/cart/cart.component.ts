import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../cart.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface Product {
  id: string; // Unique identifier for the product
  name: string;
  price: number;}// Name of the product      

interface CartItem {
  product: Product; // The product itself
  quantity: number; // Quantity of the product
}

@Component({
  selector: 'app-cart',
  imports: [NgIf,NgFor,FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
router=inject(Router)
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  increaseQuantity(productId: string) {
    this.cartService.increaseQuantity(productId);
  }

  decreaseQuantity(productId: string) {
    this.cartService.decreaseQuantity(productId);
  }

  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  get totalItems() {
    return this.cartService.getTotalItems();
  }
  get totalPrice() {
    return this.cartService.getTotal();
  }
  updateQuantity(productId: string, quantity: number): void {
    const item = this.cartItems.find(cartItem => cartItem.product.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  }
  navigate(){
    console.log("Navigating to admin");
    this.router.navigateByUrl('layout/checkout')  }
}