const products = [
  {
    image: '../assest/images/products/athletic-cotton-socks-6-pairs.jpg',
    name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
    rating: { stars: 4.5, count: 87 },
    priceCents: 1090
  },
  {
    image: '../assest/images/products/intermediate-composite-basketball.jpg',
    name: 'Intermediate Size Basketball',
    rating: { stars: 4, count: 127 },
    priceCents: 2095
  },
  {
    image: '../assest/images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
    name: 'Adults Plain Cotton T-Shirt - 2 Pack',
    rating: { stars: 4.5, count: 56 },
    priceCents: 799
  },
  {
    image: '../assest/images/products/black-2-slot-toaster.jpg',
    name: '2 Slot Toaster - Black',
    rating: { stars: 5, count: 2197 },
    priceCents: 1899
  },
  {
    image: '../assest/images/products/6-piece-white-dinner-plate-set.jpg',
    name: '6 Piece White Dinner Plate Set',
    rating: { stars: 4, count: 37 },
    priceCents: 2067
  },
  {
    image: '../assest/images/products/6-piece-non-stick-baking-set.webp',
    name: '6-Piece Nonstick, Carbon Steel Oven Bakeware Baking Set',
    rating: { stars: 4.5, count: 175 },
    priceCents: 3499
  },
  {
    image: '../assest/images/products/plain-hooded-fleece-sweatshirt-yellow.jpg',
    name: 'Plain Hooded Fleece Sweatshirt',
    rating: { stars: 4.5, count: 317 },
    priceCents: 2400
  },
  {
    image: '../assest/images/products/luxury-tower-set-6-piece.jpg',
    name: 'Luxury Towel Set - Graphite Gray',
    rating: { stars: 4.5, count: 144 },
    priceCents: 3599
  },
  {
    image: '../assest/images/products/liquid-laundry-detergent-plain.jpg',
    name: 'Liquid Laundry Detergent, 110 Loads, 82.5 Fl Oz',
    rating: { stars: 4.5, count: 305 },
    priceCents: 2899
  },
  {
    image: '../assest/images/products/knit-athletic-sneakers-gray.jpg',
    name: 'Waterproof Knit Athletic Sneakers - Gray',
    rating: { stars: 4, count: 89 },
    priceCents: 3390
  }
];
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

const product_grid = document.querySelector('.product-grid');

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
                    <button class="add-to-card-button">Add To Card</button>
                </div>
            </div>
        `
    }
}



setProductsInHtml();
console.log('sds');