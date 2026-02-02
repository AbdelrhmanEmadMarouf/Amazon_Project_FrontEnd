import { itemsCartList } from "../carts.js";
import { cartSize } from "../carts.js";
import { loadCartFromLocalStorage } from "../carts.js";
import { loadOrdersFromLocalStorage } from "../orders.js";
import { products } from "../products.js";
import { storeOrdersInLocalStorage } from "../orders.js";
import { resertCart } from "../carts.js";
import {storeCartItemsIntoLocalStorage} from "../carts.js";


const productContainer = document.querySelector('.product-container');
const items_price = document.querySelector('.items-price');
const items_number = document.querySelector('.items-number');
const totalShipingElement = document.querySelector('.delivary-price');
const totalBeforeTaxElement = document.querySelector('.total-before-tax-price');
const taxElement = document.querySelector('.tax-value');
const totalPriceElement = document.querySelector('.total-price');
const place_order_btn = document.querySelector('.place-order-btn');




let numberOfProductsInPage = 0 ;



place_order_btn.addEventListener('click',createOrder);


function getDataAfterDays(days) {

    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + days);
    return futureDate.toDateString();

}

function setUpdateButton(){ 
    document.querySelectorAll('.update-btn').forEach((updateBtn)=>{
            
    const pageIndex = updateBtn.dataset.page_index;
    const product_Index = updateBtn.dataset.product_index;

    const quantityInput = document.getElementsByClassName('quantity-input')[pageIndex];
    const saveBtn       = document.getElementsByClassName('save-btn')[pageIndex];
    const deleteBtn     = document.getElementsByClassName('delete-btn')[pageIndex];
            
    updateBtn.addEventListener('click',() =>{updateHtmlButton(updateBtn,saveBtn,quantityInput,product_Index)});
    saveBtn.addEventListener('click',() =>{updateHtmlButton(updateBtn,saveBtn,quantityInput,product_Index)});
    deleteBtn.addEventListener('click',()=>{
        itemsCartList[product_Index] = 0;
        update_cart_items();
    })
    });
    
}

function updateHtmlButton(updateBtn,saveBtn,quantityInput,product_Index){ 


    if(updateBtn.hidden){
        //*save new quantity
        updateBtn.hidden = false;
        saveBtn.hidden = true;
        quantityInput.hidden = true;

        let newQuantity = parseInt(quantityInput.value);
        
        itemsCartList[product_Index] = newQuantity;
        update_cart_items();

    }else{
        updateBtn.hidden = true;
        saveBtn.hidden = false;
        quantityInput.hidden = false;
    }


}


function setRadioButtons(){

    document.querySelectorAll('.delivery-order-container').forEach((container)=>{

        const pageIndex = container.dataset.page_index;
        

        const radioBtn1 = document.getElementsByClassName('first-radio')[pageIndex];
        const radioBtn2 = document.getElementsByClassName('second-radio')[pageIndex];
        const radioBtn3 = document.getElementsByClassName('third-radio')[pageIndex];
        const productDate = document.getElementsByClassName('delivery-data')[pageIndex];



        radioBtn1.addEventListener('click',()=>{  
            productDate.innerHTML = 'Delivery date : '+getDataAfterDays(10);
            update_order_summary();
            });

        radioBtn2.addEventListener('click',()=>{ 
            productDate.innerHTML = 'Delivery date : '+getDataAfterDays(4);
            update_order_summary();
            });

        radioBtn3.addEventListener('click',()=>{ 
            productDate.innerHTML = 'Delivery date : '+getDataAfterDays(2);
            update_order_summary();
            });


    });
}


function update_cart_items(){
    storeCartItemsIntoLocalStorage();
    initialization();
}

function getArriveData(index){
            const firstRadio = document.getElementsByClassName('first-radio')[index];
            const secondRadio = document.getElementsByClassName('second-radio')[index];
            const thirdRadio = document.getElementsByClassName('third-radio')[index];

            const firstShippingData = document.getElementsByClassName('shipping-date1')[index];
            const secondShippingData = document.getElementsByClassName('shipping-date2')[index];
            const thirdShippingData = document.getElementsByClassName('shipping-date3')[index];


            if (firstRadio.checked){
                return firstShippingData.innerHTML;
            }
            
            if (secondRadio.checked){
                return secondShippingData.innerHTML;
            }


            
            
            return thirdShippingData.innerHTML;
            

}



function createOrder(){
    
    let orderList = [];


    for(let i=0; i<numberOfProductsInPage; i++){

        const productIndexElement = document.getElementsByClassName('index-in-products')[i];


        let productIndex = parseInt(productIndexElement.innerHTML);
        let theArriveData = getArriveData(i);
        let productQuantity = itemsCartList[productIndex];
        
        const product = {
            index : productIndex ,
            quantity : productQuantity ,
            arriveData : theArriveData,
            placed_Data : getDataAfterDays(0),
            total_price_of_order : getToalPriceOfOrder()
        };
        
        orderList.push(product);
        
    }

        const orderListInObject = arrayToObject(orderList);
        

        storeOrdersInLocalStorage(orderListInObject);
        


        resertCart();
        initialization();

}

function getToalPriceOfOrder(){
    return  totalPriceElement.innerHTML;
}

function arrayToObject(arr){

    //* transfer Array into Object
    const obj = arr.reduce((myObj, currentItemInArray, index) => {
    myObj[index] = currentItemInArray;
    return myObj;
    }, {});

    return obj;
    
}


function calculate_items_price(){
    let total = 0;

    for(let index in products){
        if(itemsCartList[index] === 0 ) continue;
        
        let productQuantity = itemsCartList[index];
        let productValue = products[index].priceCents;
        total+=( productValue*productQuantity);
    }

    let totalPrice = (total/100).toFixed(2);
    items_price.innerHTML = `$${totalPrice}`;
    return total;
}

function calculate_total_shipping(){
        let total = 0;
        

        for(let i=0; i<numberOfProductsInPage; i++){
            
            const secondRadio = document.getElementsByClassName('second-radio')[i];
            const thirdRadio = document.getElementsByClassName('third-radio')[i];



            if (secondRadio.checked){
                total +=499;
            }else if(thirdRadio.checked){
                total +=999;
            }
            
        }

    let totalShipping = (total/100).toFixed(2);
    totalShipingElement.innerHTML = `$${totalShipping}`;
    return total;
}



function setProductsInHtml(){
    let html = ``;
    productContainer.innerHTML = '';
    let itemNumber = 0;


    if(itemsCartList.length ===0) return;

    for(let index in products){


        if(itemsCartList[index] ===0) 
            continue;
        

        html +=`
        <div class="product-container">

                <div class="index-in-products" hidden>${index}</div>

                <div class="delivery-data">
                    Delivery date: ${getDataAfterDays(10)}
                </div>

                <div class="product-data">
                    <img class="product-img" src=${products[index].image} alt="product-img">

                    <div>
                        <div class="product-name">${products[index].name}</div>
                        <div class="product-price">$${((products[index].priceCents)/100).toFixed(2)}</div>
                        <div class="product-quantity">Quantity ${itemsCartList[index]}</div>

                    <div class="update-container">

                    <div class="updated-case">
                        <button class="update-btn" data-page_index="${itemNumber}" data-product_index="${index}" onclick="
                            
                        ">Update</button>
                    </div>

                    <div class="save-case" >
                            <input class="quantity-input" type="number" min="1" hidden/>
                            <button class="save-btn" hidden>Save</button>
                    </div>

                    </div>  

                    <button class="delete-btn">Delete</button>

                    </div>

                    <div class="delivery-order-container" data-page_index="${itemNumber}">
                


                    <label class="shipping-option">
                        <div>
                            <div class="shipping-date1">${getDataAfterDays(10)}</div>
                            <div class="shipping-price">FREE Shipping</div>
                        </div>
                        <input class="first-radio" type="radio"  name="shipping-${itemNumber}" >
                    </label>

                    <label class="shipping-option">
                        <div>
                            <div class="shipping-date2">${getDataAfterDays(4)}</div>
                            <div class="shipping-price">$4.99 - Shipping</div>
                        </div>
                        <input class="second-radio" type="radio" name="shipping-${itemNumber}">
                    </label>

                    <label class="shipping-option">
                        <div>
                            <div class="shipping-date3">${getDataAfterDays(2)}</div>
                            <div class="shipping-price">$9.99 - Shipping</div>
                        </div>
                        <input class="third-radio" type="radio" name="shipping-${itemNumber}">
                    </label>
                </div>

                </div>
        </div>`;


        itemNumber++;
    }

    
    
    numberOfProductsInPage = itemNumber;
    productContainer.innerHTML = html;
    setUpdateButton();
    setRadioButtons();

}

function update_order_summary(){

    

    const place_order_button = document.querySelector('.place-order-btn');
    place_order_button.disabled = false;


    items_number.innerHTML = `items(${cartSize})`;
    let totalItemsPrice  = calculate_items_price();
    let totalShipping    = calculate_total_shipping();
    let totalBeforeTax  = totalItemsPrice + totalShipping ;
    let taxValue = totalBeforeTax/10;
    let TotalOrder =  totalBeforeTax + taxValue ;

    totalBeforeTax = (totalBeforeTax/100).toFixed(2);
    totalBeforeTaxElement.innerHTML = `$${totalBeforeTax}`;
    
    taxValue = (taxValue/100).toFixed(2);
    taxElement.innerHTML = `$${taxValue}`;
    
    
    TotalOrder = (TotalOrder/100).toFixed(2);
    totalPriceElement.innerHTML = `$${TotalOrder}`;

}

function reset_order_summary(){
    const orderSummarySection = document.querySelector('.summary-section');
    orderSummarySection.innerHTML = `<div class="order-summary">
                    Order Summary

                    <div>
                        <span class="items-number">Item(0)</span>
                        <span class="items-price">$0.00</span>
                    </div>
                    <div>
                        <span class="delivary-option">Shipping & handling:</span>
                        <span class="delivary-price">$0.00</span>
                    </div>
                    <div>
                        <span class="total-before-tax">Total before tax:</span>
                        <span class="total-before-tax-price">$0.00</span>
                    </div>
                    <div>
                        <span class="tax">Estimated tax (10%):</span>
                        <span class="tax-value">$0.00</span>
                    </div>
                    <div>
                        <br>
                    </div>
                    <div>
                        <span class="total">Order total:</span>
                        <span class="total-price">$0.00</span>
                    </div>

                    <button class="place-order-btn" disabled>
                        Place Your Order
                    </button>
                </div>`;

}

function initialization(){
    loadCartFromLocalStorage('checkout.js');
    loadOrdersFromLocalStorage();
    setProductsInHtml();

    if(cartSize ===0) {
        reset_order_summary();
        return;
    }
    update_order_summary();
    calculate_items_price()
}


initialization();