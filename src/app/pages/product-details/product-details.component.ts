import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';
import { CommentListComponent } from "../../comments/comment-list/comment-list.component";
import { CommentFormComponent } from "../../comments/comment-form/comment-form.component";
import { CardComponent } from "../../layout/card/card.component";
import { SubscriptionFormComponent } from "../../subscription-form/subscription-form.component";
import { LatectCComponent } from "../../layout/latest-c/latect-c.component";
import { NgFor } from '@angular/common';
interface product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}
@Component({
  selector: 'app-product-details',
  imports: [CommentListComponent, CommentFormComponent, NgFor, SubscriptionFormComponent, LatectCComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  productDetails:product | undefined;
  productList:product[]= [];
 
  productId: string | null = null;
  proCategory: string | null = null;
  category:string | null = null;

constructor(private route:ActivatedRoute,
  private productService:ProductService
){}
  ngOnInit(): void {
    // Replace with actual logic to get params
    this.productId = this.route.snapshot.paramMap.get('id');
    console.log(this.productId)
 
    this.getProductDetail(this.productId);


  }

getProductDetail(productId: string | null){
  if (productId) {
    this.productService.getProductById(productId).subscribe((res:any)=>{
      this.productDetails = res[0];
      this.proCategory = this.productDetails?.category ?? null;
        console.log("category", this.proCategory);
        if (this.proCategory) {
          this.getProductByCategory(this.proCategory);
        } else {
          console.error("Category is null");
        }
      console.log(res);
    },(error: any)=>{
      console.error("Error fetching product details",error);
    });
  } else {
    console.error("Product ID is null");
  }
}
getProductByCategory(proCategory: string) {
  this.productService.getProductByCategory(proCategory).subscribe((data: product[]) => {
    console.log("Response from API:", data); // Log the response
    this.productList = data; // Make sure this is an array
  }, (error: any) => {
    console.error("Error fetching products by category", error);
  });
}
// getProductByCategory(proCategory: string) {
//   this.productService.getProductByCategory(proCategory).subscribe((res: any) => {
// this.productList = res;
//     console.log("by category:",res);
//   }, (error: any) => {
//     console.error("Error fetching products by category", error);
//   });}
}
