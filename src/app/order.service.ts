import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
interface order{
  id:string,
  name:string,
  email:string,
  address:string,
  status:string,

  order_details: string; // Adjust type as necessary
}
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderUrl = 'http://localhost:8888/orders'; 
  private update='http://localhost:8888';// Your Vert.x API URL
  constructor(private http: HttpClient) { }
  
 getOrders(): Observable<order[]> {
    return this.http.get<order[]>(this.orderUrl);
  }
  getOrderCount():Observable<number> {
      return this.getOrders().pipe(
        map(orders => orders.length)
      );
    }
    
    updateOrderStatus(orderId: string, updatePayload: any): Observable<any> {
      return this.http.put(`${this.update}/updateStatus/${orderId}`, updatePayload,{responseType:'text'});
    }
}
