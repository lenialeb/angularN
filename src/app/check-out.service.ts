import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {
  private checkoutUrl = 'http://localhost:8888/checkout';
  constructor(private http: HttpClient) { }

  checkout(order: { name: string; orderDetail: string }): Observable<any> {
      return this.http.post<any>(this.checkoutUrl, order,{
        responseType: 'text' as 'json' // Specify responseType as text
  
      });
    }
}
