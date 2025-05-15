import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../interfaces/product';
import { TruncateWordsPipe } from '../../pipes/truncate-words.pipe';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddtocartComponent } from "../addtocart/addtocart.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, TruncateWordsPipe, RouterLink, FormsModule, AddtocartComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  FilteredProducts: Product[] = [];
  SearchTrim: string = '';

  constructor(private ProductsService: ProductService) {}

  ngOnInit(): void {
    this.GetProducts();
  }

  GetProducts() {
    this.ProductsService.GetProducts().subscribe((res) => {
      this.products = res;
      this.FilteredProducts = this.products;
    });
  }

  SearchFilter() {
    if (this.SearchTrim) {
      this.FilteredProducts = this.products.filter((product) =>
        product.title.toLowerCase().includes(this.SearchTrim.toLowerCase())
      );
    } else {
      this.FilteredProducts = this.products;
    }
  }
}
