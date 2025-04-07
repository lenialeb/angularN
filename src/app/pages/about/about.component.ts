import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  imagePath: string = 'assets/images/img1.jpg';
 userCount: number = 0;
  productCount:number=0;
  
  constructor(private userService: UserService,
    private productService:ProductService,
  
  ) {}

  ngOnInit(): void {
    this.userService.getUserCount().subscribe(count => {
      this.userCount = count;
    });
    this.productService.getProductCount().subscribe(count => {
      this.productCount = count;
    });
    
  }
}
