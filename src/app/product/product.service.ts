import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getProductsUrl = 'http://localhost:3000/products';

  constructor(private http:HttpClient) { }

  getProductData() {
    const token = localStorage.getItem('token');
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
      })
    };

    return this.http.get(this.getProductsUrl, requestOptions);
  }
}
