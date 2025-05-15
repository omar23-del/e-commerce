import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Product } from '../../interfaces/product';
import { TruncateWordsPipe } from '../../pipes/truncate-words.pipe';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AddtocartComponent } from "../addtocart/addtocart.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TruncateWordsPipe, RouterLink, AddtocartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

products: Product[] = []

constructor (private ProductsService: ProductService) {}

ngOnInit() {
  this.GetProducts()
}

GetProducts() {
  this.ProductsService.GetProducts().subscribe(
    (res) => {
      this.products = res
    }
  )
}
}
