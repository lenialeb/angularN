import { Injectable } from '@angular/core';



import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
interface product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
}
@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private apiUrl = 'http://localhost:8888/products';
  private apiUrlPaginated = 'http://localhost:8888/productsP';
  private review = 'http://localhost:8888/review';

  private url='http://localhost:8888/productId'
  private proCat='http://localhost:8888/productCategory'
  private productsCache: product[] | null = null;
  
  constructor(private http: HttpClient) {}
  // Get all products
  // getProducts(): Observable<any> {
  //   if (this.productsCache) {
  //     return of(this.productsCache); // Return cached data
  //   }
  //   return this.http.get<any>('http://localhost:8888/products').pipe(
  //     tap(data => this.productsCache = data) // Cache the fetched data
  //   );
  // }
  getProducts(): Observable<any> {
    
    return this.http.get<any>('http://localhost:8888/products')
      // Cache the fetched data
    
  }
  getProductsP(currentPage: number, pageSize: number,searchTerm:string,sortBy:string,sortOrder:string): Observable<any> {
    const params = new HttpParams()
      .set('page', currentPage.toString())
      .set('pageSize', pageSize.toString())
      .set('search', searchTerm)
      .set('sortBy', sortBy)
      .set('sortOrder', sortOrder);
      const token = localStorage.getItem('token')
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}` // Ensure this is set correctly
      });

    return this.http.get<any>(this.apiUrlPaginated, { headers,params });
  }
  rateProduct(id: string, rating: number): Observable<void> {
    return this.http.post<void>(this.review, { id, rating },{responseType: 'text' as 'json'});
}
  // Get product by ID
  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  // Add a new product
  addProduct(product: { name: string; price: number;description:string; image:string;category:string  }): Observable<any> {
    return this.http.post<any>(this.apiUrl, product,{responseType: 'text' as 'json'});
  }

  // Update an existing product
  
  updateProduct(id: string, product: { name: string; price: number; description:string; image:string;category:string }): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${id}`, product, {
      responseType: 'text' as 'json' // Specify responseType as text
    });
  }

  // Delete a product
  deleteProduct(id: string): Observable<any> {
   
      return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
    }
    //  getProductCount(): Observable<number> 
    //  {
    //     return this.getProducts().pipe(
    //       map(products => products.length)
    //     );
    //   }

      getProductByCategory(category: string): Observable<product[]> 
      {
        return this.http.get<product[]>(`${this.proCat}/${category}`);
      }
  }

