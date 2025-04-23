

  

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { CardComponent } from '../../layout/card/card.component';
import { SubscriptionFormComponent } from '../../subscription-form/subscription-form.component';
import { LatectCComponent } from '../../layout/latest-c/latect-c.component';
import { NgFor, NgIf } from '@angular/common';
import { CartService } from '../../../services/product/cart.service';
import { CommentsService } from '../../../services/comments/comments.service';
import { ActivatedRoute } from '@angular/router';

interface Product {
  id: string;  // Updated to match your database
  name: string;  // Updated to match your database
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
}

@Component({
  selector: 'app-home',
  imports: [CardComponent, SubscriptionFormComponent, LatectCComponent, NgFor,NgIf],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productId: string =''
  commentCounts: { [key: string]: number } = {};  showAll: boolean = false;
  currentPage: number = 1;
  pageSize: number = 10;
  productList: Product[] = [];
  displayedProductList: Product[] = [];
  lProduct: Product[] = []; // Assuming you'll use this for latest products
  lProList: Product[] = [];
  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService, private commentService: CommentsService) {}

  ngOnInit(): void {
    this.fetchProductList();

   
  }

  fetchProductList() {
    
    this.productService.getProducts().subscribe((data: Product[]) => {
      console.log("data",data)
      this.productList = data;
      this.displayedProductList = this.productList.slice(0, 8); 
      this.getCount();// Get the first 4 products
      console.log('Fetched Products for home:', this.productList);
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
  toggleShowMore() {
    this.showAll = !this.showAll;
    this.displayedProductList = this.showAll ? this.productList : this.productList.slice(0, 8);
  }
  getCount() {
    const productIds = this.displayedProductList.map(product => product.id);
  
    productIds.forEach(productId => {
      this.commentService.getComments(productId).subscribe({
        next: (response) => {
          const count = response.total_comments; // Access total_comments from the response
          console.log(`Comment count for product ID ${productId}:`, count); // Log the count
          this.commentCounts[productId] = count; // Store the comment count using the product ID
        },
        error: (error) => {
          console.error(`Error fetching comment count for product ID ${productId}`, error);
        }
      });
    });
  }}