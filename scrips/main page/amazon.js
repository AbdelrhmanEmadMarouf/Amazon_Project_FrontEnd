import {products} from '../products.js';
import { getStarImg } from '../products.js';
import { loadCartFromLocalStorage } from '../carts.js';
import {addItemToTheCart} from '../carts.js';

const product_grid = document.querySelector('.product-grid');
const searchBar = document.getElementById('search');

let timeOut ;



function setAddToCartButton(){

    document.querySelectorAll('.js-add-to-cart').forEach((button)=>{

        button.addEventListener('click',()=>{

        

        const index = button.dataset.index;

        const checkMarkElement =  document.getElementsByClassName('check-mark-image')[index];
        const addedTextElement =  document.getElementsByClassName('added-text')[index];

        const ProductQuantityElement = document.getElementsByClassName('product-quantity')[index];

        const quantity = parseInt(ProductQuantityElement.value);

        appearAdded(checkMarkElement,addedTextElement);


        addItemToTheCart(index,quantity);
            

    });

});
}

function appearAdded(checkMarkElement,addedTextElement){
        if(checkMarkElement.hidden === false){
            clearTimeout(timeOut);
        }
        checkMarkElement.hidden = false;
        addedTextElement.hidden = false;
        timeOut =  setTimeout(function(){
        checkMarkElement.hidden = true;
        addedTextElement.hidden = true;
        },2000);  
}


function search(query){
    filtered_products = [];

    querySize = query.length;
    query = query.toLowerCase();

    for(index in products){

        currentProductName = products[index].name.toLowerCase();
        subStringOfProduct = currentProductName.substring(0, querySize);
        
        
        if(subStringOfProduct === query){
                filtered_products.push(products[index]);
        }


        
    }
    setProductsInHtml(filtered_products);
}


function setProductsInHtml(products_list){
    product_grid.innerHTML = ``;  
    let product_stars_img  = ``;

    for(let index in products_list){
        product_stars_img = getStarImg(products_list[index].rating.stars);
        product_grid.innerHTML += `
        <div class="product_card">

                <div class="img-container">
                    <img id="product_img" src=${products_list[index].image}>
                </div>
                
                <div class="product-name">
                    ${products_list[index].name}
                </div>

                <div class="product-rating-container">
                    <img id="product_rating" src="../assest/images/ratings/${product_stars_img}">

                    <div class="number-of-reveiws">
                        ${products_list[index].rating.count}
                    </div>
                </div>

                <div class="product-price">
                    $${((products_list[index].priceCents)/100).toFixed(2)}
                </div>
                
                <div class="product-quantity-container">
                    <select class="product-quantity">
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

                        <<button class="add-to-card-button js-add-to-cart" data-index="${index}">
                            Add to Cart
                        </button>

                </div>
            </div>
        `;
    }

        setAddToCartButton();

}


function initialization(){
    setProductsInHtml(products);
    loadCartFromLocalStorage('amazon.js');
}


searchBar.addEventListener('input', function(){
    search(searchBar.value);
});



initialization();
