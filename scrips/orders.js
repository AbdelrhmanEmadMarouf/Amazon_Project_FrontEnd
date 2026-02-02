export let ordersList = []; 


export function loadOrdersFromLocalStorage(){
    //* get Json from local storage
    const objectInJson = localStorage.getItem('orders');
    
    

    if(objectInJson === null) return [];

    //* transfer json into object
    const obj = JSON.parse(objectInJson);

    //* transfer object into array
    ordersList = Object.values(obj);    
}

function arrayToObject(arr){

    //* transfer Array into Object
    const obj = arr.reduce((myObj, currentItemInArray, index) => {
    myObj[index] = currentItemInArray;
    return myObj;
    }, {});

    return obj;
    
}


export function storeOrdersInLocalStorage(orderListInObject){

        ordersList.push(orderListInObject);
        const ordersListInObject = arrayToObject(ordersList);
        const odrersListInJson = JSON.stringify(ordersListInObject);
        localStorage.setItem('orders',odrersListInJson);

}