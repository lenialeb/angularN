import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';
interface product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}
@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  productDetails:product | undefined;
  productId: string | null = null;
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
      console.log(res);
    },(error: any)=>{
      console.error("Error fetching product details",error);
    });
  } else {
    console.error("Product ID is null");
  }
}}
