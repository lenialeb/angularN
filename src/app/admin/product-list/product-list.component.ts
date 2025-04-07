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
  Search={
    searchTerm:  '' // Initialize searchTerm
  }
    ngOnInit() {
    this.fetchProducts();
    // Initialize searchTerm
  
  }

  constructor(private productService: ProductService) { }
  fetchProducts()
   {
    console.log('Fetching products...');
    this.productService.getProducts().subscribe((res:any) => {
      this.productList = res;
      this.filteredProducts = res; // Initialize filteredProducts with all products
      console.log('Fetched products:', this.productList);
    }, error => {
      console.error('Error fetching products:', error);
    });
  }
  get paginatedProducts()
  {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredProducts.slice(start, start + this.pageSize);
  }

  totalPages() 
  {
    return Math.ceil(this.filteredProducts.length / this.pageSize);
  }

  changePage(page: number) 
  {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
    }
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
  search() 
  {
    this.currentPage = 1; // Reset to the first page on search
    console.log('Current search term:', this.Search.searchTerm);
  
    this.filteredProducts = this.productList.filter(product => {
      const match = product.name.toLowerCase().includes(this.Search.searchTerm.toLowerCase());
      console.log(`Product: ${product.name}, Match: ${match}`);
      return match;
    });
  
  }
}
