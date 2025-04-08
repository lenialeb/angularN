import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';
import { CommentListComponent } from "../../comments/comment-list/comment-list.component";
import { CommentFormComponent } from "../../comments/comment-form/comment-form.component";
import { CardComponent } from "../../layout/card/card.component";
import { SubscriptionFormComponent } from "../../subscription-form/subscription-form.component";
import { LatectCComponent } from "../../layout/latest-c/latect-c.component";
import { NgFor, NgIf } from '@angular/common';
import { RelatedPostComponent } from "../../layout/related-post/related-post.component";
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
  standalone: true,
  imports: [CommentListComponent, NgIf, CommentFormComponent, NgFor, SubscriptionFormComponent, RelatedPostComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  productDetails:product | undefined;
  productList:product[]= [];
  displayedProducts: product[] = [];
  showAll: boolean = false;
  productId: string | null = null;
  proCategory: string | null = null;
  category:string | null = null;
router=inject(Router);
constructor(private route:ActivatedRoute,
  private productService:ProductService
){}
  // 
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.getProductDetail(this.productId);
    });
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
    console.log("Response from API:", data);
    console.log("Current Product ID:", this.productId);

    // Convert both to strings
    const currentProductId = String(this.productId);

    // Filter out the product with the clicked product ID
    this.productList = data.filter(product => { return String(product.id) !== currentProductId });
    console.log("Filtered Product List:", this.productList);
      this.displayedProducts = this.productList.slice(0, 4);
      console.log("Displayed Products:", this.displayedProducts);
       // Compare as strings
   

   
  }, (error: any) => {
    console.error("Error fetching products by category", error);
  });
}
goToProductDetails(productId: string) {
  this.router.navigateByUrl(`layout/productDetails/${productId}`);
}
toggleShowMore() {
  this.showAll = !this.showAll;
  this.displayedProducts = this.showAll ? this.productList : this.productList.slice(0, 4);
}
}

