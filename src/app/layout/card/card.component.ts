
import { Component, inject, Input } from '@angular/core';
import { CartService } from '../../../services/product/cart.service';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';
import { CommentsService } from '../../../services/comments/comments.service';
interface Product {
  id:string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  comment_count:number;
 
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
  commentCounts: { [key: string]: number } = {};  showAll: boolean = false;

 

  @Input() product:Product | undefined; 
  
  constructor(private cartService: CartService) {}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
  navigate(id:string){
this.router.navigateByUrl(`layout/productDetails/${id}`);
  }

}