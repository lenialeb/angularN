import { Component, inject } from '@angular/core';
import { ProductService } from '../../product.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Correct import

@Component({
  selector: 'app-product-add',
  standalone: true, // Mark this component as standalone if using Angular 14+
  imports: [FormsModule],
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'] // Corrected to styleUrls
})
export class ProductAddComponent {
  product = {
    name: '', // Initialize as empty string
    price: 0
  };

  router = inject(Router);

  constructor(private productService: ProductService) { }

  addProduct() {
    this.productService.addProduct(this.product).subscribe( (res: any) => {
        console.log("Product added successfully", res);
        this.router.navigateByUrl('admin');
      }, (error) => {
        console.error("Product addition failed", error);
      }
    );
     
    }
  
}