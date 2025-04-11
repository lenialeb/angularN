import { Injectable } from '@angular/core';



import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
interface product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}
@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private apiUrl = 'http://localhost:8888/products';
  private apiUrlPaginated = 'http://localhost:8888/productsP';

  private url='http://localhost:8888/productId'
  private proCat='http://localhost:8888/productCategory'

   // Your Vert.x API URL

  constructor(private http: HttpClient) {}

  // Get all products
  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getProductsP(currentPage: number, pageSize: number,searchTerm:string): Observable<any> {
    const params = new HttpParams()
      .set('page', currentPage.toString())
      .set('pageSize', pageSize.toString())
      .set('search', searchTerm);

    return this.http.get<any>(this.apiUrlPaginated, { params });
  }

  // Get product by ID
  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  // Add a new product
  addProduct(product: { name: string; price: number;description:string; image:string;category:string  }): Observable<any> {
    return this.http.post<any>(this.apiUrl, product,{
      responseType: 'text' as 'json' // Specify responseType as text

    });
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

