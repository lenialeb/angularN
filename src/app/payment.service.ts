import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

 
  private orderUrl = 'http://localhost:8888/payment'; // Your Vert.x API URL
  constructor(private http: HttpClient) { }
  
//  payment(paymentData: string): Observable<any> {
//   console.log("data",paymentData)
//     return this.http.post<any>(this.orderUrl, paymentData);
//   }
  payment(paymentData: any): Observable<any> {
    console.log("received payment data",paymentData)
    return this.http.post(this.orderUrl, paymentData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
