const numberOfItems = document.querySelector('.item-numbers');

let itemsInCart = [];
let numberOfItemsInCart = 0 ;


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

function initialization(){
    itemsInCart = getProductCartsFromLocalStorage();
    numberOfItemsInCart = getNumberOfItemsInCart(itemsInCart);
    numberOfItems.innerHTML = `(${numberOfItemsInCart} item)`
}

initialization();