import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly host: string = 'https://angularvertx.alwaysdata.net/';

  constructor(private http: HttpClient) {}

  public getUrl(filename: string): Observable<any> {
    return this.http.get(`${this.host}/geturl.php?filename=${filename}`);
  }

  // public upload(file: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('file', file, file.name);

  //   return this.http.post(`${this.host}/upload.php`, formData, {
  //     headers: new HttpHeaders({
  //       'Accept': 'application/json'
  //     })
  //   });
  // }
  public upload(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.host}/upload.php`, formData, {
        headers: new HttpHeaders({
            'Accept': 'application/json'
        })
    }).pipe(
        switchMap(() => this.getUrl(file.name)) // Return the URL after upload
    );
}
}