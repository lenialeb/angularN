
import { Component, inject, Input } from '@angular/core';
import { CartService } from '../../../services/product/cart.service';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';
interface Product {
  id:string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
 
}
@Component({
  selector: 'app-card',
  imports: [NgIf,NgFor],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  productList: Product[] = [];
  router=inject(Router);
  ngOnInit() {
this.productService.getProducts().subscribe((data: Product[]) => {
this.productList = data;
console.log('Received commentCount:', this.commentCount); // Log the received comment count

})
    // Any initialization logic can go here
  }
 

  @Input() product:Product | undefined; 
  @Input() commentCount!: number;
  constructor(private cartService: CartService,private productService:ProductService) {}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
  navigate(id:string){
this.router.navigateByUrl(`layout/productDetails/${id}`);
  }
  
}