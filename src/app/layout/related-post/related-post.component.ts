import { NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
interface Product{
  id:string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}
@Component({
  selector: 'app-related-post',
 
  templateUrl: './related-post.component.html',
  styleUrl: './related-post.component.css'
})
export class RelatedPostComponent {
  router=inject(Router);

  @Input () product:Product | undefined


  navigate(id:string){
    this.router.navigateByUrl(`layout/productDetails/${id}`);
      }

}
