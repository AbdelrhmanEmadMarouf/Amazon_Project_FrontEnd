const numberOfItems  = document.querySelector('#number_of_items_in_cart');
const productElement = document.querySelector('.product-details');
import {products} from "../products.js";
import {cartSize} from "../carts.js";

let product = {};

function setProductInHtml(){
    let productIndex = parseInt(product.index);
    let html = `
                <div class="arriving-date">
                    Arriving on ${product.arriveData}
                </div>

                <div class="product-name">
                    ${products[productIndex].name}
                </div>

                <div class="product-quantity">
                    Quantity: ${product.quantity}
                </div>

                <div class="product-img-container">
                    <img class="product-img" src=${products[productIndex].image} alt="product img">
                </div>`;


    productElement.innerHTML = html;
}

function initialization(){

    numberOfItems.innerHTML = `${cartSize}`;

    const params = new URLSearchParams(window.location.search);
    const productAsJson = params.get("product");
    product = JSON.parse(productAsJson);
    setProductInHtml();



}

initialization();