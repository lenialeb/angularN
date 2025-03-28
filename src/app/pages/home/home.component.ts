

  

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { CardComponent } from '../../layout/card/card.component';
import { SubscriptionFormComponent } from '../../subscription-form/subscription-form.component';
import { LatectCComponent } from '../../layout/latest-c/latect-c.component';
import { NgFor } from '@angular/common';
import { CartService } from '../../cart.service';

interface Product {
  id: string;  // Updated to match your database
  name: string;  // Updated to match your database
  price: number;
}

@Component({
  selector: 'app-home',
  imports: [CardComponent, SubscriptionFormComponent, LatectCComponent, NgFor],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productList: Product[] = [];
  lProduct: Product[] = []; // Assuming you'll use this for latest products
  lProList: Product[] = [];
  constructor(private productService: ProductService, private cartService:CartService) {}

  ngOnInit(): void {
    this.fetchProductList();
    this.  fetchLProduct() 

  }

  fetchProductList() {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.productList = data;
      console.log('Fetched Products:', this.productList);
    }, error => {
      console.error('Error fetching product list', error);
    });
  }
  fetchLProduct() {
    this.productService.getProducts().subscribe((data: Product[]) => {
      console.log('Fetched Products:', data);
      this.lProList = data;
      this.lProduct = this.lProList.slice(0, 4); // Get the first 4 products
    }, error => {
      console.error('Error fetching product list', error);
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}