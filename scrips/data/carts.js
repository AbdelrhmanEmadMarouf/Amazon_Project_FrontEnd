import {productsSize} from './products.js';
export let itemsCartList = new Array(productsSize).fill(0);
export let cartSize = 0 ;

//* in amazon.js
const numOfitemsCartListElement = document.querySelector('#number_of_items_in_cart');

//* in checkout.js
const numberOfItemsElement = document.querySelector('.item-numbers');

//* in orders_page.js
const numberOfItems = document.querySelector('#number_of_items_in_cart');

export function loadCartFromLocalStorage(htmlPage){

    

    //* get Json from local storage
    const objectInJson = localStorage.getItem('products_in_cart');
    

    if(objectInJson === null) {
        itemsCartList = [];
    }else{
    //* transfer json into object
    const obj = JSON.parse(objectInJson);

    //* transfer object into array
    itemsCartList = Object.values(obj);
    }


    
    updateCartSize(htmlPage);
    

}

function updateCartSize(htmlPage){ 


    let cnt = 0;

    for(let index in itemsCartList){
        if(itemsCartList[index] !== 0){
            cnt+=itemsCartList[index];
        }
    }
    cartSize =  cnt;

    
    

    if(htmlPage === 'amazon.js'){
            numOfitemsCartListElement.innerHTML = `${String(cartSize)}`;
    }else if(htmlPage === 'checkout.js'){
            numberOfItemsElement.innerHTML = `(${cartSize} item)`;
    }else if(htmlPage === 'orders_page.js'){
            numberOfItems.innerHTML = `${cartSize}`;
    }



}

export function storeCartItemsIntoLocalStorage(){

    //* transfer Array into Object
    const obj = itemsCartList.reduce((myObj, currentItemInArray, index) => {
    myObj[index] = currentItemInArray;
    return myObj;
    }, {});

    //*transfer Object into Json
    const objectInJson = JSON.stringify(obj);


    localStorage.setItem('products_in_cart',objectInJson);
}

export function addItemToTheCart(index,quantity){

    if(itemsCartList.length === 0){
        itemsCartList = new Array(productsSize).fill(0);
    }

    itemsCartList[index]+=quantity;
    cartSize+=quantity;
    numOfitemsCartListElement.innerHTML = `${String(cartSize)}`;
    storeCartItemsIntoLocalStorage();
    
}


export function resertCart(){
        localStorage.removeItem('products_in_cart');  
        itemsCartList = [];
}