import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private ProductsService: HttpClient) {}

  GetProducts(): Observable<any> {
    return this.ProductsService.get('https://fakestoreapi.com/products');
  }

  GetSingleProduct(id: string): Observable<any> {
    return this.ProductsService.get(`https://fakestoreapi.com/products/${id}`);
  }
}
