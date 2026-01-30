const numberOfItems = document.querySelector('.item-numbers');
const productContainer = document.querySelector('.product-container');
const items_price = document.querySelector('.items-price');
const items_number = document.querySelector('.items-number');
const totalShipingElement = document.querySelector('.delivary-price');
const totalBeforeTaxElement = document.querySelector('.total-before-tax-price');
const taxElement = document.querySelector('.tax-value');
const totalPriceElement = document.querySelector('.total-price');




let itemsInCart = [];
let numberOfItemsInCart = 0 ;
let numberOfProductsInPage = 0 ;





function getDataAfterDays(days) {

    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + days);
    return futureDate.toDateString();

}

function getProductCartsFromLocalStorage(){

    //* get Json from local storage
    const objectInJson = localStorage.getItem('products_in_cart');
    
    if(objectInJson === null) return itemsInCart ;

    //* transfer json into object
    const obj = JSON.parse(objectInJson);

    //* transfer object into array
    const arr = Object.values(obj);

    return arr;
    
}

function getNumberOfItemsInCart(arr){
    let cnt = 0;
    for(index in arr){
        if(arr[index] !== 0){
            cnt+=arr[index];
        }
    }

    return cnt;
}

function updateHtmlButton(index_of_product_in_page,index_in_product_in_arr){ 


    const updateBtn = document.getElementsByClassName('update-btn')[index_of_product_in_page];
    const quantityInput = document.getElementsByClassName('quantity-input')[index_of_product_in_page];
    const saveBtn = document.getElementsByClassName('save-btn')[index_of_product_in_page];

    if(updateBtn.hidden){
        //*save new quantity
        updateBtn.hidden = false;
        saveBtn.hidden = true;
        quantityInput.hidden = true;

        let newQuantity = parseInt(quantityInput.value);
        
        itemsInCart[index_in_product_in_arr] = newQuantity;
        update_cart_items();

    }else{
        updateBtn.hidden = true;
        saveBtn.hidden = false;
        quantityInput.hidden = false;
    }


}

function deleteItem(index_in_product_in_arr){
        itemsInCart[index_in_product_in_arr] = 0;
        update_cart_items();
}

function storeCartItemsIntoLocalStorage(){

    //* transfer Array into Object
    const obj = itemsInCart.reduce((myObj, currentItemInArray, index) => {
    myObj[index] = currentItemInArray;
    return myObj;
    }, {});

    //*transfer Object into Json
    const objectInJson = JSON.stringify(obj);


    localStorage.setItem('products_in_cart',objectInJson);
}

function update_cart_items(){
    storeCartItemsIntoLocalStorage();
    initialization();
}


function update_the_data_of_product(index,data){
    const productData = document.getElementsByClassName('delivery-data')[index];
    productData.innerHTML = 'Delivery date : '+data;
    update_order_summary();
}

function calculate_items_price(){
    let total = 0;

    for(index in products){
        if(itemsInCart[index] === 0 ) continue;
        
        let productQuantity = itemsInCart[index];
        let productValue = products[index].priceCents;
        total+=( productValue*productQuantity);
    }

    totalPrice = (total/100).toFixed(2);
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

    totalShipping = (total/100).toFixed(2);
    totalShipingElement.innerHTML = `$${totalShipping}`;
    return total;
}



function setProductsInHtml(){
    let html = ``;
    productContainer.innerHTML = '';
    let itemNumber = 0;


    if(itemsInCart.length ===0) return;

    for(index in products){

        if(itemsInCart[index] ===0) 
            continue;
        

        html +=`
        <div class="product-container">


                <div class="delivery-data">
                    Delivery date: ${getDataAfterDays(10)}
                </div>

                <div class="product-data">
                    <img class="product-img" src=${products[index].image} alt="product-img">

                    <div>
                        <div class="product-name">${products[index].name}</div>
                        <div class="product-price">$${((products[index].priceCents)/100).toFixed(2)}</div>
                        <div class="product-quantity">Quantity ${itemsInCart[index]}</div>

                    <div class="update-container">

                    <div class="updated-case">
                        <button class="update-btn" onclick="
                            updateHtmlButton(${itemNumber},${index});
                        ">Update</button>
                    </div>

                    <div class="save-case" >
                            <input class="quantity-input" type="number" min="1" hidden/>
                            <button class="save-btn"  onclick="
                                updateHtmlButton(${itemNumber},${index});
                            " hidden>Save</button>
                    </div>

                    </div>  

                    <button class="delete-btn" onclick="
                        deleteItem(${index});
                    ">Delete</button>

                    </div>

                    <div class="delivery-order-container">
                


                    <label class="shipping-option">
                        <div>
                            <div class="shipping-date">${getDataAfterDays(10)}</div>
                            <div class="shipping-price">FREE Shipping</div>
                        </div>
                        <input class="first-radio" type="radio" name="shipping-${itemNumber}" checked onclick="
                            update_the_data_of_product(${itemNumber},'${getDataAfterDays(10)}'); 
                        ">
                    </label>

                    <label class="shipping-option">
                        <div>
                            <div class="shipping-date">${getDataAfterDays(4)}</div>
                            <div class="shipping-price">$4.99 - Shipping</div>
                        </div>
                        <input class="second-radio" type="radio" name="shipping-${itemNumber}" onclick="
                            update_the_data_of_product(${itemNumber},'${getDataAfterDays(4)}'); 
                        ">
                    </label>

                    <label class="shipping-option">
                        <div>
                            <div class="shipping-date">${getDataAfterDays(2)}</div>
                            <div class="shipping-price">$9.99 - Shipping</div>
                        </div>
                        <input class="third-radio" type="radio" name="shipping-${itemNumber}" onclick="
                            update_the_data_of_product(${itemNumber},'${getDataAfterDays(2)}'); 
                        ">
                    </label>
                </div>

                </div>
        </div>`;


        itemNumber++;
    }

    numberOfProductsInPage = itemNumber;

    productContainer.innerHTML = html;

}

function update_order_summary(){
    items_number.innerHTML = `items(${numberOfItemsInCart})`;
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

function initialization(){
    itemsInCart = getProductCartsFromLocalStorage();
    numberOfItemsInCart = getNumberOfItemsInCart(itemsInCart);
    numberOfItems.innerHTML = `(${numberOfItemsInCart} item)`;
    setProductsInHtml();
    update_order_summary();
    calculate_items_price()
}



initialization();