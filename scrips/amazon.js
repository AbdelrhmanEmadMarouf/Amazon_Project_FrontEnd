const product_stars_img = [
    'rating-0.png',
    'rating-05.png',
    'rating-10.png',
    'rating-15.png',
    'rating-20.png',
    'rating-25.png',
    'rating-30.png',
    'rating-35.png',
    'rating-40.png',
    'rating-45.png',
    'rating-50.png',
]
const numberOfProducts = products.length;
const itemsInCart = new Array(numberOfProducts).fill(0);
const product_grid = document.querySelector('.product-grid');
const numOfItemsInCart = document.querySelector('#number_of_items_in_cart');

let numberOfItemsInCart = 0 ;

function getStarImg(starsCount){
    if(starsCount === 0){
        return product_stars_img[0];
    }
    if(starsCount === 0.5){
        return product_stars_img[1];
    }
    if(starsCount === 1){
        return product_stars_img[2];
    }
    if(starsCount === 1.5){
        return product_stars_img[3];
    }
    if(starsCount === 2){
        return product_stars_img[4];
    }
    if(starsCount === 2.5){
        return product_stars_img[5];
    }
    if(starsCount === 3){
        return product_stars_img[6];
    }
    if(starsCount === 3.5){
        return product_stars_img[7];
    }
    if(starsCount === 4){
        return product_stars_img[8];
    }
    if(starsCount === 4.5){
        return product_stars_img[9];
    }
    if(starsCount === 5){
        return product_stars_img[10];
    }
}


let timeOut ;
function appearAdded(cont1,cont2){
        if(cont1.hidden === false){
            clearTimeout(timeOut);
        }
        cont1.hidden = false;
        cont2.hidden = false;
        timeOut =  setTimeout(function(){
        cont1.hidden = true;
        cont2.hidden = true;
        },2000);  
}

function addItemToTheCart(itemId){
    itemsInCart[itemId]++;
    numberOfItemsInCart++;
    numOfItemsInCart.innerHTML = `${String(numberOfItemsInCart)}`;
}


function setProductsInHtml(){
    product_grid.innerHTML = ``;  
    let product_stars_img  = ``;
    for(let index in products){
        product_stars_img = getStarImg(products[index].rating.stars);
        product_grid.innerHTML += `
        <div class="product_card">

                <div class="img-container">
                    <img id="product_img" src=${products[index].image}>
                </div>
                
                <div class="product-name">
                    ${products[index].name}
                </div>

                <div class="product-rating-container">
                    <img id="product_rating" src="../assest/images/ratings/${product_stars_img}">

                    <div class="number-of-reveiws">
                        ${products[index].rating.count}
                    </div>
                </div>

                <div class="product-price">
                    $${((products[index].priceCents)/100).toFixed(2)}
                </div>
                
                <div class="product-quantity-container">
                    <select>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                    </select>
                </div>

                <div class="button-container">
                    <div class="button-container">
                        <div class="added-container" >
                            <img class="check-mark-image" src="../assest/images/icons/checkmark.png" hidden>
                            <div class="added-text" hidden>
                                Added
                            </div>
                        </div>
                    <button class="add-to-card-button"
                            onclick="appearAdded(
                                document.getElementsByClassName('check-mark-image')[${index}],
                                document.getElementsByClassName('added-text')[${index}]
                            );
                            addItemToTheCart(${index});
                            ">
                            Add to Cart
                            </button>

                </div>
            </div>
        `
    }
}

setProductsInHtml();
