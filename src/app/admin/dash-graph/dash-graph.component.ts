import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { ProductService } from '../../../services/product/product.service';
import { OrderService } from '../../../services/product/order.service';

@Component({
  selector: 'app-dash-graph',
  imports: [],
  templateUrl: './dash-graph.component.html',
  styleUrl: './dash-graph.component.css'
})
export class DashGraphComponent {
  userCount: number = 0;
  productCount:number=0;
  orderCount:number=0;
  constructor(private userService: UserService,
    private productService:ProductService,
    private orderService:OrderService
  ) {}

  ngOnInit(): void {
    this.userService.getUsersP(1,6,'').subscribe(count => {
      this.userCount = count.total;
    });
    
    this.orderService.getOrderCount().subscribe(count => {
      this.orderCount = count;
    });
    this.productService.getProductsP(1, 6, '','','').subscribe((res: any) => {
      this.productCount = res.total;
    }
    , error => {  
      console.error('Error fetching products:', error);
    }
    );
  }
}
