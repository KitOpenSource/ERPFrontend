import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'http://localhost:3000';
  getProductsUrl = 'http://localhost:3000/products';
  newProuctUrl = this.baseUrl + '/products';
  genNewPidUrl = this.baseUrl + '/products/newpid';

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

  newProductData(form:any){
    const token = localStorage.getItem('token');
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token,
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(this.newProuctUrl, form, requestOptions);
  }

  genNewPid() {
    const token = localStorage.getItem('token');
    const requestOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + token
      })
    };

    return this.http.get(this.genNewPidUrl, requestOptions);
  }
}
