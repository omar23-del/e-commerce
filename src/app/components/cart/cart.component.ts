import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../interfaces/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  productArray: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    const cart = this.cartService.getCart();
    if (cart) {
      this.productArray = [...cart.products];
    } else {
      this.productArray = [];
    }
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity < 1) quantity = 1;

    const user = JSON.parse(localStorage.getItem('UserData')!);
    this.cartService.updateQuantity(productId, user.email, quantity);
    this.getProducts();
  }

  removeFromCart(product: Product) {
    this.cartService.deleteFromCart(product);
    this.getProducts();
  }

  getTotal(): number {
    return this.productArray.reduce((total, item) => {
      return total + item.price * item?.quantity;
    }, 0);
  }

  clearCart() {
      console.log('clearCart called');
    Swal.fire({
      title: 'Are you sure?',
      text: 'All products will be removed from your cart!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, clear it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.clearCart();
        this.getProducts();

        Swal.fire(
          'Cleared!',
          'Your cart has been emptied successfully.',
          'success'
        );
      }
    });
  }
}
