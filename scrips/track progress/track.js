const numberOfItems  = document.querySelector('#number_of_items_in_cart');
const productElement = document.querySelector('.product-details');
let numberOfItemsInCart = 0 ;

let itemsInCart =[];
let product = {};




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
    itemsInCart = getProductCartsFromLocalStorage();
    numberOfItemsInCart = getNumberOfItemsInCart(itemsInCart);
    numberOfItems.innerHTML = `${numberOfItemsInCart}`;

    const params = new URLSearchParams(window.location.search);
    const productAsJson = params.get("product");
    product = JSON.parse(productAsJson);
    console.log(product);
    setProductInHtml();



}
initialization();