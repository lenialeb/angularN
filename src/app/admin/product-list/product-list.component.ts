import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../product.service';
import { RouterLink } from '@angular/router';
interface Product {
  id: string;
  name: string;
  price: number;
}
@Component({
  selector: 'app-product-list',
  imports: [NgFor,RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  productList: Product[] = []; 
  ngOnInit() {
    this.fetchProducts();
  
  }
 
  constructor(private productService: ProductService) { }
  fetchProducts() {
    console.log('Fetching products...');
    this.productService.getProducts().subscribe((res:any) => {
      this.productList = res;
      console.log('Fetched products:', this.productList);
    }, error => {
      console.error('Error fetching products:', error);
    });
  }
  delete(id:string){
   
    this.productService.deleteProduct(id).subscribe((res:any)=>{
      console.log("Product deleted successfully",res);
      this.fetchProducts();
    },(error)=>{
      console.error("Product deletion failed",error);
    })
  }
}
