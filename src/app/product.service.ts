import { Injectable } from '@angular/core';



import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private apiUrl = 'http://localhost:8888/products';
  private url='http://localhost:8888/productId' // Your Vert.x API URL

  constructor(private http: HttpClient) {}

  // Get all products
  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Get product by ID
  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  // Add a new product
  addProduct(product: { name: string; price: number }): Observable<any> {
    return this.http.post<any>(this.apiUrl, product,{
      responseType: 'text' as 'json' // Specify responseType as text

    });
  }

  // Update an existing product
  
  updateProduct(id: string, product: { name: string; price: number }): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${id}`, product, {
      responseType: 'text' as 'json' // Specify responseType as text
    });
  }

  // Delete a product
  deleteProduct(id: string): Observable<any> {
   
      return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
    }
  }

