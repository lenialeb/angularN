import { Injectable } from '@angular/core';

import { jwtDecode } from 'jwt-decode';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loginUrl = 'http://localhost:8888/login'; // Your Vert.x API URL
  private userUrl = 'http://localhost:8888/users'; // Your Vert.x user management API
private url='http://localhost:8888/userId/' // Your Vert.x API URL
  constructor(private http: HttpClient) {}

  // User login
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { username, password });
  }
  protectedApiCall(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get('http://localhost:8888/protected-endpoint', { headers });
  }

  // Register a new user
  register(user: { name: string; username: string; password: string }): Observable<any> {
   
    return this.http.post<any>(this.userUrl, user,{responseType: 'text' as 'json'});
  }
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }
  // Get all users
  getUsers(): Observable<any> {
    return this.http.get<any>(this.userUrl);
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
      return decoded.name;
      
    }
    return null;
  }
}