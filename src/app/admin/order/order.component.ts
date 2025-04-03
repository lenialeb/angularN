import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { OrderService } from '../../order.service';
import { FormsModule } from '@angular/forms';
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
  selector: 'app-order',
  imports: [NgFor,NgIf,FormsModule,NgClass],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  visibleDetails: Set<string> = new Set(); 
  currentPage=1;
  pageSize=6;
  Search={
    searchTerm:  '' // Initialize searchTerm
  }
  Order : order []=[]
  filteredOrder: order[]=[]
  ngOnInit(){
    this.order()
  }

constructor (private orderService :OrderService){}
order(){
  this.orderService.getOrders().subscribe((res:any)=>{
    this.Order=res;
    this.filteredOrder=res
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

get paginatedOrders() {
  const start = (this.currentPage - 1) * this.pageSize;
  return this.filteredOrder.slice(start, start + this.pageSize);
}

totalPages() {
  return Math.ceil(this.filteredOrder.length / this.pageSize);
}

changePage(page: number) {
  if (page >= 1 && page <= this.totalPages()) {
    this.currentPage = page;
  }
}
search(){
  this.currentPage = 1; // Reset to the first page on search
    console.log('Current search term:', this.Search.searchTerm);
  
    this.filteredOrder = this.Order.filter(order => {
      const match = order.order_details.toLowerCase().includes(this.Search.searchTerm.toLowerCase());
      console.log(`Product: ${order.name}, Match: ${match}`);
      return match;
    });
}
// updateOrderStatus(orderId: string, status: string) {
//   const updatePayload = { status: status };
  
//   this.
  
// }
updateOrderStatus(orderId: string, status: string) {
  const updatePayload = { status: status };
  
  this.orderService.updateOrderStatus(orderId, updatePayload).subscribe(
    response => {
      console.log('Order status updated successfully', response);
      // Optionally, you can refresh the orders or show a success message
    },
    error => {
      console.error('Error updating order status', error);
      alert('Failed to update order status. Please try again.');
    }
  );
}

}