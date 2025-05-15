import { Injectable } from '@angular/core';
import { Product } from '../../interfaces/product';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  createCart() {
    const cart = localStorage.getItem('cart'); //fisrt make a variuable for cart
    if (!cart) {
      localStorage.setItem('cart', JSON.stringify([])); //if cart aint there set a cart by localstorage
    }
  }

  addToCart(product: Product) {
    const cart = localStorage.getItem('cart');
    const user = localStorage.getItem('UserData');

    if (cart) {
      //variable for cart array that belongs to the user and we convert it to js array to deal with it & conatains tghe email and the product array
      const cartArray: { email: string; products: Product[] }[] =
        JSON.parse(cart);

      if (user) {
        const userData: User = JSON.parse(user); //convert the userdata to js to deal with it

        //variable to check the user cart
        const checkUserCart = cartArray.find(
          (item) => item.email === userData.email
        );

        //if theres no cart for the user make a cart and push in it the new data
        if (!checkUserCart) {
          cartArray.push({
            email: userData.email,
            products: [{ ...product, quantity: 1 }],
          });
        } else {
          //variable to check if the product.id === the product id that the user clicked on it
          const checkProduct = checkUserCart?.products.find(
            (prod) => prod.id === product.id
          );

          //check if the clicked product wasnt found add it to the user cart
          if (!checkProduct) {
            checkUserCart?.products.push({ ...product, quantity: 1 });
          } else {
            //if product found we are gonna update the quantity
            const currentProductIndex = checkUserCart?.products.findIndex(
              (prod) => prod.id === product.id
            );

            checkUserCart?.products.splice(currentProductIndex as number, 1, {
              ...checkProduct,
              quantity: (checkProduct?.quantity || 0) + 1,
            });
          }
        }
        localStorage.setItem('cart', JSON.stringify(cartArray));
      }
    }
  }

  getCart(): { email: string; products: Product[] } | undefined {
    const user = localStorage.getItem('UserData'); //check if user data found in local storage
    const cart = localStorage.getItem('cart'); //check if user cart found in local storage

    if (user && cart) {
      const userData = JSON.parse(user); //convert it to js to deal with it
      const cartArray = JSON.parse(cart); //convert it to js to deal with it

      //
      const checkCart = cartArray.find(
        (item: { email: string; products: Product[] }) =>
          item.email === userData.email
      );

      return checkCart;
    }

    return;
  }

  getAllCarts() {
    const cart = localStorage.getItem('cart');
    const cartArray: { email: string; products: Product[] }[] = JSON.parse(
      cart ?? ''
    );
    return cartArray;
  }

deleteFromCart(product: Product) {
  const data = this.getCart();

  if (data) {
    const updatedProducts = data.products.filter(
      (prod) => prod.id !== product.id
    );
    data.products = updatedProducts;

    let cartArray = this.getAllCarts();

    cartArray = cartArray.filter((cart) => cart.email !== data.email);

    cartArray.push(data);

    localStorage.setItem('cart', JSON.stringify(cartArray));
  }
}


clearCart() {
  const data = this.getCart();

  if (data) {
    let cartArray = this.getAllCarts();

    cartArray = cartArray.filter((cart) => cart.email !== data.email);

    cartArray.push({ ...data, products: [] });

    localStorage.setItem('cart', JSON.stringify(cartArray));
  }
}



  updateQuantity(productId: number, userEmail: string, newQuantity: number) {
    const userCart = this.getCart();

    if (!userCart) return;

    const product = userCart.products.find((prod) => prod.id === productId);

    if (product) {
      product.quantity = newQuantity < 1 ? 1 : newQuantity;

      const updatedProducts = userCart.products.map((prod) =>
        prod.id === productId ? product : prod
      );

      userCart.products = updatedProducts;

      let cartArray = this.getAllCarts();

      cartArray = cartArray.filter((cart) => cart.email !== userCart.email);

      cartArray.push(userCart);

      localStorage.setItem('cart', JSON.stringify(cartArray));
    }
  }
}
