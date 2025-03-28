
import { Component, Input } from '@angular/core';
import { CartService } from '../../cart.service';
import { NgIf } from '@angular/common';
interface Product {
  id:string;
  name: string;
  price: number;
 
}
@Component({
  selector: 'app-card',
  imports: [NgIf],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() product:Product | undefined; 
  constructor(private cartService: CartService) {}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}