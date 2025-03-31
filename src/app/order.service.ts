import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  private orderUrl = 'http://localhost:8888/orders'; // Your Vert.x API URL
  constructor(private http: HttpClient) { }
  
 getOrders(): Observable<order[]> {
    return this.http.get<order[]>(this.orderUrl);
  }
}
