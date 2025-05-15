import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/product';
import { AddtocartComponent } from "../addtocart/addtocart.component";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, AddtocartComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  ProductId: string = '';
  product: Product | null = null;

  constructor(
    private productService: ProductService,
    private ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.GetProductId();
    this.GetSingleProduct();
  }

  GetProductId() {
    this.ActivatedRoute.paramMap.subscribe((res) => {
      this.ProductId = res.get('id') || '';
    });
  }

  GetSingleProduct() {
    this.productService.GetSingleProduct(this.ProductId).subscribe((res) => {
      this.product = res;
    });
  }
}
