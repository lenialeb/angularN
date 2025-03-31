import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {
  private checkoutUrl = 'http://localhost:8888/checkout';
  constructor(private http: HttpClient) { }

  // checkout(order: { name: string; orderDetail: string }): Observable<any> {
  //     return this.http.post<any>(this.checkoutUrl, order,{
  //       responseType: 'text' as 'json' // Specify responseType as text
  
  //     });
  //   }

//   checkout(order: { name: string; email: string; address: string; orderDetail: string }): Observable<any> {
//     const token = localStorage.getItem('jwtToken'); // Get the token from local storage
//     const headers = { 'Authorization': `Bearer ${token}` }; // Set the Authorization header

//     return this.http.post<any>(this.checkoutUrl, order, {
//         headers: headers,
//         responseType: 'text' as 'json' // Specify responseType as text
//     });
// }
checkout(order: { name: string; email: string; address: string; orderDetail: string }): Observable<any> {
  const token = localStorage.getItem('jwtToken'); // Get the token from local storage
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.post<any>(this.checkoutUrl, order, { headers, responseType: 'text' as 'json' });
 
}
}
