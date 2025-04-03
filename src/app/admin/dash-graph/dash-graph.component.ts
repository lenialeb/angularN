import { Component } from '@angular/core';
import { UserService } from '../../user.service';
import { ProductService } from '../../product.service';
import { OrderService } from '../../order.service';

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
    this.userService.getUserCount().subscribe(count => {
      this.userCount = count;
    });
    this.productService.getProductCount().subscribe(count => {
      this.productCount = count;
    });
    this.orderService.getOrderCount().subscribe(count => {
      this.orderCount = count;
    });
  }
}
