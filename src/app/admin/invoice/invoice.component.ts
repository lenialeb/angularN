import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { OrderService } from '../../order.service';
interface order{
  id:string,
  name:string,
  email:string,
  address:string,
  status:string,
  order_details: string; 
}

interface Product {
  id: number;
  name: string;
  price: number;
}

interface OrderDetail {
  product: Product;
  quantity: number;
}
@Component({
  selector: 'app-invoice',
  imports: [NgFor,NgIf],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent {
  visibleDetails: Set<string> = new Set(); 
  currentPage=1;
  pageSize=6;
  ngOnInit(){
    this.order()
  }
  Order : order []=[]
constructor (private orderService :OrderService){}
order(){
  this.orderService.getOrders().subscribe((res:any)=>{
    this.Order=res;
    console.log("orders",this.Order)
  }), (error: any) => {
    console.error('Error fetching orders:', error);
  }
}
parseOrderDetails(details: string): OrderDetail[] {
  try {
    return JSON.parse(details); 
  } catch (e) {
    console.error('Error parsing order details:', e);
    return []; 
  }
}

toggleDetails(orderId: string) {
  if (this.visibleDetails.has(orderId)) {
    this.visibleDetails.delete(orderId);
  } else {
    this.visibleDetails.add(orderId); 
  }
}

isDetailsVisible(orderId: string): boolean {
  return this.visibleDetails.has(orderId);
}

get paginatedProducts() {
  const start = (this.currentPage - 1) * this.pageSize;
  return this.Order.slice(start, start + this.pageSize);
}

totalPages() {
  return Math.ceil(this.Order.length / this.pageSize);
}

changePage(page: number) {
  if (page >= 1 && page <= this.totalPages()) {
    this.currentPage = page;
  }
}

}