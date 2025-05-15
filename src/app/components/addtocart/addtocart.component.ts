import { Component, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interfaces/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addtocart',
  standalone:true,
  imports: [],
  templateUrl: './addtocart.component.html',
  styleUrl: './addtocart.component.css',
})
export class AddtocartComponent {
  @Input() product!: Product

  constructor(private cartService: CartService, private toast:ToastrService) {}

  addToCart(prod: Product) {
    this.cartService.createCart()
    this.cartService.addToCart(prod)
          this.toast.success('product has been added successfully', '', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        progressBar: true,
        toastClass: 'toast-added-to-cart ',
      });
  }
}
