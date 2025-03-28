import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
 // Ensure correct import
interface Product {
  id: string; // Unique identifier for the product
  name: string; // Name of the product
  price: number; }// Price of the product
interface CartItem {
  product: Product; // The product itself
  quantity: number; // Quantity of the product in the cart
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.cartItems);

  constructor() {
    this.loadCartFromStorage();
  }

  private loadCartFromStorage() {
    const storedCart = localStorage.getItem('cartItems');
    this.cartItems = storedCart ? JSON.parse(storedCart) : [];
    this.cartItemsSubject.next(this.cartItems);
  }

  private saveCartToStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  getCartItems() {
    return this.cartItemsSubject.asObservable();
  }

  addToCart(product: Product) {
    const existingCartItem = this.cartItems.find(item => item.product.id === product.id);
    if (existingCartItem) {
      existingCartItem.quantity += 1; // Increase quantity if already in cart
    } else {
      this.cartItems.push({ product, quantity: 1 }); // Initialize quantity
    }
    this.saveCartToStorage();
    this.cartItemsSubject.next(this.cartItems);
  }

  increaseQuantity(productId: string) {
    const cartItem = this.cartItems.find(item => item.product.id === productId);
    if (cartItem) {
      cartItem.quantity += 1;
      this.saveCartToStorage();
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  decreaseQuantity(productId: string) {
    const cartItem = this.cartItems.find(item => item.product.id === productId);
    if (cartItem) {
      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      } else {
        this.removeFromCart(productId); // Remove if quantity is 1
      }
      this.saveCartToStorage();
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  removeFromCart(productId: string) {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.saveCartToStorage();
    this.cartItemsSubject.next(this.cartItems);
  }

  clearCart() {
    this.cartItems = [];
    this.saveCartToStorage();
    this.cartItemsSubject.next(this.cartItems);
  }

  getTotalItems() {
    return this.cartItems.length; // Return the number of unique products
  }
  getTotal() {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
  

}