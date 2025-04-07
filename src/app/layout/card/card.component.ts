
import { Component, inject, Input } from '@angular/core';
import { CartService } from '../../../services/product/cart.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
interface Product {
  id:string;
  name: string;
  price: number;
  description: string;
  image: string;
 
}
@Component({
  selector: 'app-card',
  imports: [NgIf],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  router=inject(Router);

  @Input() product:Product | undefined; 
  constructor(private cartService: CartService) {}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
  navigate(id:string){
this.router.navigateByUrl(`layout/productDetails/${id}`);
  }
}