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
import { ProductService } from '../../../services/product/product.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage/storage.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [FormsModule,NgFor],
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {
  product = {
    name: '',
    price: 0,
    description: '',
    image: '',
    category: '',
  };
  role: string='';
  categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Beauty'];
  private selectedFile: File | null = null; // To store the selected file
  router = inject(Router);
  ngOnInit(): void {
    const token = localStorage.getItem('jwtToken');
      console.log("Token to check out:", token); // Log the token
    
      if (!token) {
          console.error('No JWT token found. Redirecting to login.');
          this.router.navigate(['/login']); // Redirect to login if no token
          return;
      }
     
      // Decode the token to get user details
      let decodedToken: any;
      if (token) {
        decodedToken = JSON.parse(atob(token.split('.')[1]));
      } else {
        console.error("Token is null or undefined");
        return;
      }
      this.role = decodedToken.role;
      if (this.role!== 'admin') {
        alert("Access denied")
        this.router.navigate(['/layout/home']); // Redirect to access denied page
      }
    
  }
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
          alert("Product added successfully");
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