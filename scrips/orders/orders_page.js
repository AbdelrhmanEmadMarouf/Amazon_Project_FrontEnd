import { products } from "../products.js";
import { ordersList } from "../orders.js";
import { loadCartFromLocalStorage } from "../carts.js";
import { loadOrdersFromLocalStorage } from "../orders.js";
import { addItemToTheCart } from "../carts.js";

const mainElement = document.querySelector('.main');

function objectToArray(obj){
    //* transfer object into array
    const arr = Object.values(obj);

    return arr;
}

function setBuyAgainButton(){
    document.querySelectorAll('.buy-btn').forEach((btn)=>{

        btn.addEventListener('click',()=>{

        const productIndex = btn.dataset.product_index;
        addItemToTheCart(productIndex,1);
        initialization();
        })


    });
}

function setTrackButton(){
    document.querySelectorAll('.track-button').forEach((btn)=>{
        btn.addEventListener('click',()=>{
            const encodedProductInJson = btn.dataset.objectInJson;
            const decodedProductInJson = decodeURIComponent(encodedProductInJson);
            goToProduct(decodedProductInJson);
        });
    });
}


function  goToProduct(productInJson) {

    window.location.href = 
    `track.html?product=${productInJson}`;
}

function setOrdersInHtml(){


    let html =``;

    for(let index in ordersList){

        let orderList = objectToArray(ordersList[index]);

        html+=` <div class="order-section">

                <div class="order-header">

                    <div class="order-date">
                        Order Placed : ${orderList[0].placed_Data}
                    </div>

                    <div class="order-price">
                        Total : ${orderList[0].total_price_of_order}
                    </div>


                </div>`;
            

        
        

        for(let index2 in orderList){

            let productIndex = orderList[index2].index;

            let objectInJson = '';
            objectInJson+= JSON.stringify(orderList[index2])
            
            const EncodedJson = encodeURIComponent(
                JSON.stringify(orderList[index2])
            );

            

            html+=`<div class="order-body">

                    <div class="products-container">

                        <div class="product-details">

                            <div class="img-container">
                                <img class="product-img" src=${products[productIndex].image}>
                            </div>


                            <div class="product-data">

                                <div class="product-name">
                                    ${products[productIndex].name}
                                </div>

                                <div class="product-arriving-data">
                                    Arrive Data :  ${orderList[index2].arriveData}
                                </div>

                                <div class="product-quantity">
                                    Quantity: ${orderList[index2].quantity}
                                </div>

                                <div class="buy-button-container">
                                    <button class="buy-btn" data-product_index="${productIndex}">
                                        Buy It Again
                                    </button>
                                </div>

                            </div>

                            <div class="track-package-container">
                                <button class="track-button" data-object-in-json="${EncodedJson}">
                                    Track Package
                                </button>
                            </div>



                        </div>

                    </div>

                </div>`;
        }
        html+=`</div>`;

    }


    mainElement.innerHTML = html;
    setBuyAgainButton();
    setTrackButton();
}

function initialization(){
    
    loadCartFromLocalStorage('orders_page.js');
    loadOrdersFromLocalStorage();
    setOrdersInHtml();
}
initialization();