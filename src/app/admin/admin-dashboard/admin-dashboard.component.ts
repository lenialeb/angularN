import { Component, inject } from '@angular/core';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ProductService } from '../../../services/product/product.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AdminServiceService } from '../../../services/admin/admin-service.service';
import { AboutComponent } from "../../pages/about/about.component";
import { DashGraphComponent } from '../dash-graph/dash-graph.component';
import { TransactionListComponent } from '../transaction-list/transaction-list.component';
import { UserListComponent } from '../user-list/user-list.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { InvoiceComponent } from '../invoice/invoice.component';
import { OrderComponent } from "../order/order.component";
interface Product {
  id: string;
  name: string;
  price: number;
}
@Component({
  selector: 'app-admin-dashboard',
  imports: [AdminNavComponent, NgIf, NgClass, RouterLink, DashGraphComponent, TransactionListComponent, UserListComponent, ProductListComponent, InvoiceComponent, OrderComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
productList: Product[] = []; 
selectedComponent: string | undefined;

role:string=''
router=inject(Router)
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
 
  if (this.role !== 'admin') {
    alert("Access denied")
    this.router.navigate(['/layout/home']); // Redirect to access denied page
  }
}



constructor(private productService:ProductService, public adminService: AdminServiceService) {
  this.adminService.selectedComponent$.subscribe(component => {
    this.selectedComponent = component;
  });
 }
 changeComponent(component: string) {
  this.adminService.setComponent(component);
}


}
