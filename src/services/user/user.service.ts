import { Injectable } from '@angular/core';

import { jwtDecode } from 'jwt-decode';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loginUrl = 'http://localhost:8888/login'; 
  private userUrl = 'http://localhost:8888/users';
  private userUrlPaginated = 'http://localhost:8888/usersP'; 
private url='http://localhost:8888/userId/' 
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { username, password }).pipe(
      tap(response => {
          if (response.token) {
              localStorage.setItem('jwtToken', response.token);
              console.log('Token stored in local storage:', response.token); 
          }
      })
  );
  }

  protectedApiCall(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get('http://localhost:8888/protected-endpoint', { headers });
  }

  // Register a new user
  register(user: { name: string; username: string; password: string; role: string }): Observable<any> {
   
    return this.http.post<any>(this.userUrl, user);
  }
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }
  // Get all users
  getUsers(): Observable<any> {
    return this.http.get<any>(this.userUrl);
  }
  // getUsersP(currentPage: number, pageSize: number,searchTerm:string): Observable<any> {
  //   const params = new HttpParams()
  //     .set('page', currentPage.toString())
  //     .set('pageSize', pageSize.toString())
  //     .set('search', searchTerm);
  //     const headers = new HttpHeaders({
  //       'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Ensure the token is retrieved correctly
  //     });
  //   return this.http.get<any>(this.userUrlPaginated, {headers, params });
  // }
  
  getUsersP(currentPage: number, pageSize: number, searchTerm: string): Observable<any> {
    const params = new HttpParams()
      .set('page', currentPage.toString())
      .set('pageSize', pageSize.toString())
      .set('search', searchTerm);

    const token = localStorage.getItem('token'); // Ensure the token is retrieved correctly
    console.log("Token for request:", token); // Log the token for debugging

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Ensure this is set correctly
    });

    return this.http.get<any>(this.userUrlPaginated, { headers, params });
  }

  // Update user details
  updateUser(id: string, user: { name: string; username: string; password: string }): Observable<any> {
    return this.http.put<any>(`${this.userUrl}/${id}`, user,{ responseType: 'text' as 'json'});
   
  }

  // Delete a user
  deleteUser(id: string): Observable<any> {

    return this.http.delete(`${this.userUrl}/${id}`,{ responseType: 'text' });
  }
  getUsernameFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      console.log('Decoded Token:', decoded);
      // console.log(decoded);
      return decoded.sub;
    
      
    }
    return null;
  }
  getidFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      console.log('Decoded Token:', decoded);
      // console.log(decoded);
      return decoded.id;
    
      
    }
    return null;
  }
  // getUserCount(): Observable<number> {
  //   return this.getUsers().pipe(
  //     map(users => users.length)
  //   );
  // }
}