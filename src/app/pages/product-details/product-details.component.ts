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
import { CommentsService } from '../../../services/comments/comments.service';
interface product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  created_at: {
    year: number;
    monthValue: number;
    dayOfMonth: number;
  };
  formattedDate?: string; 
comment_count:number;
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
  total:number=0;
  router=inject(Router);
  constructor(private route:ActivatedRoute,
  private productService:ProductService,
  private commentService:CommentsService
){}
   
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.getProductDetail(this.productId);
      // this.getCount(this.productId);
    
    });
  }


// getCount(productId: string | null){
//   if(productId){
//     this.commentService.getComments(productId).subscribe((res:any)=>{
//       this.total=res.total_comments;
      
//     })
//   }

// }
getProductDetail(productId: string | null) {
  if (productId) {
    this.productService.getProductById(productId).subscribe((res: any) => {
      
      this.productDetails = res[0];
     


  
      if (this.productDetails && this.productDetails.created_at) {
        if (this.productDetails && this.productDetails.created_at) {
          this.productDetails.formattedDate = this.parseDate(this.productDetails.created_at);
        }
      } else {
        console.warn("created_at is undefined for product", this.productDetails);
        if (this.productDetails) {
          this.productDetails.formattedDate = 'Date not available'; // Handle undefined case
        }
      }

      this.proCategory = this.productDetails?.category ?? null;
      console.log("Category:", this.proCategory);

      if (this.proCategory) {
        this.getProductByCategory(this.proCategory);
      } else {
        console.error("Category is null");
      }
    }, (error: any) => {
      console.error("Error fetching product details", error);
    });
  } else {
    console.error("Product ID is null");
  }
}
getProductByCategory(proCategory: string) {
  this.productService.getProductByCategory(proCategory).subscribe((data: any[]) => {
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
    console.log("Filtered Product List:", this.productList);
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
parseDate(dateObj: any): string {
  if (dateObj && dateObj.year && dateObj.monthValue && dateObj.dayOfMonth) {
    // Create a date string in the format YYYY-MM-DD
    const formattedDate = `${String(dateObj.year).padStart(4, '0')}-${String(dateObj.monthValue).padStart(2, '0')}-${String(dateObj.dayOfMonth).padStart(2, '0')}`;
    return formattedDate; // Return the formatted date
  } else {
    console.error('Invalid date object:', dateObj);
    return 'Invalid date';
  }
}
setRating(rating: number) {
  if (this.productDetails) {
    this.productDetails.rating = rating;
   this.rateProduct();
  }
  
}
rateProduct() {
  if (this.productDetails) {
  if(this.productId){
    this.productService.rateProduct(this.productId, this.productDetails.rating).subscribe(() => {
          alert('Rating submitted!');
        
      });}
    
  }
}
}

