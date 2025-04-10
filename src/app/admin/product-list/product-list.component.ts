import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
interface Product {
  id: string;
  name: string;
  price: number;
}
@Component({
  selector: 'app-product-list',
  imports: [NgFor,RouterLink,FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  productList: Product[] = []; 
  currentPage: number = 1;
  pageSize: number = 6;
  filteredProducts: Product[] = [];

    searchTerm: string = ''; // Initialize searchTerm with a default value
  
  total: number = 0;
  totalPages: number = 0;
    ngOnInit() {
    this.fetchProducts();
    // Initialize searchTerm
  
  }

  constructor(private productService: ProductService) { }
  fetchProducts()
   {
    console.log('Fetching products...');
    this.productService.getProductsP(this.currentPage,this.pageSize,this.searchTerm).subscribe((res:any) => {
      this.productList = res.products;
      this.total = res.total;
      this.totalPages = Math.ceil(res.total / this.pageSize);
      this.filteredProducts = res.products; // Initialize filteredProducts with all products
      console.log('Fetched products:', this.productList);
      console.log('Total products:', this.total);
      console.log('Total pages:', this.totalPages);
    }, error => {
      console.error('Error fetching products:', error);
    });
  }
  nextPage() {
    console.log('Current page:', this.currentPage);
    if (this.currentPage < this.totalPages) {
        this.currentPage++;
        console.log(this.currentPage) // Increment the current page
        this.fetchProducts(); // Fetch products for the new page
    }
}

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchProducts();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.fetchProducts();
  }

  delete(id:string)
  {
   
    this.productService.deleteProduct(id).subscribe((res:any)=>{
      console.log("Product deleted successfully",res);
      this.fetchProducts();
    },(error)=>{
      console.error("Product deletion failed",error);
    })
  }
  
  search(){
    this.currentPage = 1; // Reset to first page on new search
    console.log('Current search term:', this.searchTerm);
    this.fetchProducts(); // Fetch products with the new search term
  }
}
