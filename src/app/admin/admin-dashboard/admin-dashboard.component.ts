import { Component } from '@angular/core';
import { AdminNavComponent } from '../admin-nav/admin-nav.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { ProductService } from '../../product.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminServiceService } from '../../admin-service.service';
import { AboutComponent } from "../../pages/about/about.component";
import { DashGraphComponent } from '../dash-graph/dash-graph.component';
import { TransactionListComponent } from '../transaction-list/transaction-list.component';
import { UserListComponent } from '../user-list/user-list.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { InvoiceComponent } from '../invoice/invoice.component';
interface Product {
  id: string;
  name: string;
  price: number;
}
@Component({
  selector: 'app-admin-dashboard',
  imports: [AdminNavComponent, NgIf,NgClass, RouterLink,DashGraphComponent,TransactionListComponent,UserListComponent,ProductListComponent,InvoiceComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
productList: Product[] = []; 
selectedComponent: string | undefined;





constructor(private productService:ProductService, public adminService: AdminServiceService) {
  this.adminService.selectedComponent$.subscribe(component => {
    this.selectedComponent = component;
  });
 }
 changeComponent(component: string) {
  this.adminService.setComponent(component);
}


}
