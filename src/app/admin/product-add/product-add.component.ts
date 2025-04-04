// import { Component, inject } from '@angular/core';
// import { ProductService } from '../../product.service';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router'; // Correct import

// @Component({
//   selector: 'app-product-add',
//   standalone: true, // Mark this component as standalone if using Angular 14+
//   imports: [FormsModule],
//   templateUrl: './product-add.component.html',
//   styleUrls: ['./product-add.component.css'] // Corrected to styleUrls
// })
// export class ProductAddComponent {
//   product = {
//     name: '', // Initialize as empty string
//     price: 0,
//     description:'',
//     image: '',
//   };

//   router = inject(Router);

//   constructor(private productService: ProductService) { }

//   addProduct() {
//     this.productService.addProduct(this.product).subscribe( (res: any) => {
//         console.log("Product added successfully", res);
//         this.router.navigateByUrl('admin');
//       }, (error) => {
//         console.error("Product addition failed", error);
//       }
//     );
     
//     }
  
// }
import { Component, inject } from '@angular/core';
import { ProductService } from '../../product.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../storage.service';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {
  product = {
    name: '',
    price: 0,
    description: '',
    image: ''
  };

  private selectedFile: File | null = null; // To store the selected file
  router = inject(Router);

  constructor(private productService: ProductService, private imageService:StorageService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Store the selected file
    }
  }

  async addProduct() {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    try {
      // Upload the image and get the URL
      const imageUrl = await this.imageService.upload(this.selectedFile).toPromise();
      this.product.image = imageUrl;
      console.log("the url",imageUrl) // Set the image URL in product data

      // Now add the product
      this.productService.addProduct(this.product).subscribe(
        (res: any) => {
          console.log("Product added successfully", res);
          this.router.navigateByUrl('admin');
        },
        (error) => {
          console.error("Product addition failed", error);
        }
      );
    } catch (error) {
      console.error("Image upload failed", error);
    }
  }
}