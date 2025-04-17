import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector:'app-about',
  imports:[],
  templateUrl:'./about.component.html',
  styleUrl:'./about.component.css'
})
export class AboutComponent {
  imagePath: string = 'assets/images/img1.jpg';
  userCount: number = 0;
  productCount:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             number = 0;
  
  constructor(private userService: UserService,
    private productService:ProductService,
  
  ) {}

  ngOnInit(): void {
    this.userService.getUsersP(1,6, '').subscribe(count => {
      this.userCount = count.total;
    });
    this.productService.getProductsP(1,6,'','','').subscribe(count => {
      this.productCount = count.total;
    });
    
  }
}
