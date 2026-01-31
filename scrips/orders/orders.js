const numberOfItems = document.querySelector('#number_of_items_in_cart');
const mainElement = document.querySelector('.main');
let numberOfItemsInCart = 0 ;

let itemsInCart =[];
let ordersList = [];
let order = [];




function getProductCartsFromLocalStorage(){

    //* get Json from local storage
    const objectInJson = localStorage.getItem('products_in_cart');
    
    if(objectInJson === null) return [] ;

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


function getOrdersFromLocalStorage(){
    //* get Json from local storage
    const objectInJson = localStorage.getItem('orders');
    
    

    if(objectInJson === null) return [];

    //* transfer json into object
    const obj = JSON.parse(objectInJson);

    //* transfer object into array
    const arr = Object.values(obj);

    return arr;
}

function objectToArray(obj){
    //* transfer object into array
    const arr = Object.values(obj);

    return arr;
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

function buyOrderAgain(index){
    itemsInCart[index]++;
    storeCartItemsIntoLocalStorage();
    initialization();
}

function  goToProduct(productObj) {

    const obj = JSON.parse(decodeURIComponent(productObj));
    const productInJson = JSON.stringify(obj);
    window.location.href = 
    `track.html?product=${productInJson}`;
}

function setOrdersInHtml(){
    let html =``;

    

    for(index in ordersList){

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
            

        
        

        for(index2 in orderList){

            let productIndex = orderList[index2].index;

            let objectInJson = '';
            let text = JSON.stringify(orderList[index2])
            objectInJson+=text;
            

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
                                    <button class="buy-btn" onclick="goToProduct('${encodeURIComponent(objectInJson)}')">
                                        Buy It Again
                                    </button>
                                </div>

                            </div>

                            <div class="track-package-container">
                                <button class="track-button"
                                        onclick="goToProduct('${encodeURIComponent(objectInJson)}')">
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
}

function initialization(){
    itemsInCart = getProductCartsFromLocalStorage();
    numberOfItemsInCart = getNumberOfItemsInCart(itemsInCart);
    numberOfItems.innerHTML = `${numberOfItemsInCart}`;
    ordersList = getOrdersFromLocalStorage();
    setOrdersInHtml();
}
initialization();