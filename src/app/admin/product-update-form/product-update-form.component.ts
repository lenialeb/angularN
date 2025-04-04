// import { Component, inject } from '@angular/core';
// import { ProductService } from '../../product.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   description: string;
//   image: string;
// }
// @Component({
//   selector: 'app-product-update-form',
//   imports: [FormsModule],
//   templateUrl: './product-update-form.component.html',
//   styleUrl: './product-update-form.component.css'
// })
// export class ProductUpdateFormComponent {
 
//   product: Product = { id: '', name: '', price: 0, description: '', image: '' }; // Initialize with empty values
// router=inject(Router);
//   constructor(
//     private route: ActivatedRoute,
//     private productService: ProductService
//   ) {}

//   ngOnInit(): void {
//     const productId = this.route.snapshot.paramMap.get('id');
//     console.log("Product ID from route:", productId); // Log the product ID to the console

//     if (productId) {
//       this.productService.getProductById(productId).subscribe((data: Product[]) => { // Expect array response
//         if (data.length > 0) {
//           this.product = data[0]; // Assign the first product in the array to the product object
//           console.log("Fetched product data:", this.product); // Log the product data to the console
//         } else {
//           console.error("No product found in the response.");
//         }
//       }, (error) => {
//         console.error("Error fetching product:", error);
//       });
//     } else {
//       console.error("No product ID found in route parameters.");
//     }
//   }

//   save() {
//     // Logic to save the updated product
//     this.productService.updateProduct(this.product.id, { name: this.product.name, price: this.product.price }).subscribe(() => {
//       console.log('Product updated successfully');
//       this.router.navigateByUrl('admin');
//       // Optionally redirect or show a success message
//     });
//   }
// }
import { Component, inject } from '@angular/core';
import { ProductService } from '../../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../storage.service';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

@Component({
  selector: 'app-product-update-form',
  imports: [FormsModule],
  templateUrl: './product-update-form.component.html',
  styleUrls: ['./product-update-form.component.css']
})
export class ProductUpdateFormComponent {
  product: Product = { id: '', name: '', price: 0, description: '', image: '' };
  private selectedFile: File | null = null; // To store the selected file
  router = inject(Router);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private imageService: StorageService // Assuming you have a service for handling image uploads
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    console.log("Product ID from route:", productId);

    if (productId) {
      this.productService.getProductById(productId).subscribe((data: Product[]) => {
        if (data.length > 0) {
          this.product = data[0];
          console.log("Fetched product data:", this.product);
        } else {
          console.error("No product found in the response.");
        }
      }, (error) => {
        console.error("Error fetching product:", error);
      });
    } else {
      console.error("No product ID found in route parameters.");
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Store the selected file
    }
  }

  save() {
    const productData = {
      name: this.product.name,
      price: this.product.price,
      description: this.product.description,
      image: this.product.image // Keep the existing image URL
    };
  
    // If you want to handle image upload separately, call another method here
    if (this.selectedFile) {
      this.imageService.upload(this.selectedFile).subscribe((imageUrl: string) => {
        productData.image = imageUrl; // Add image URL to product data after upload
  
        // Now update the product with the new image URL
        this.productService.updateProduct(this.product.id, productData).subscribe(() => {
          console.log("updated data",productData)
          console.log('Product updated successfully');

          this.router.navigateByUrl('admin');
        }, (error) => {
          console.error("Error updating product:", error);
        });
      }, (error) => {
        console.error("Error uploading image:", error);
      });
    } else {
      // Update product without changing the image
      this.productService.updateProduct(this.product.id, productData).subscribe(() => {
        console.log('Product updated successfully');
        this.router.navigateByUrl('admin');
      }, (error) => {
        console.error("Error updating product:", error);
      });
    }
  }
}