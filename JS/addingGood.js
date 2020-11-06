///////////////////////////////////////// ADDING GOOD TO BRACKED /////////////////////////////////////////

// Array of data of goods

var cardsData = [
    {
        imgUrl: 'Images/1.png',
        title: 'Пломбир с апельсиновым джемом',
        weight: 1.5,
        price: 310
    },
    {
        imgUrl: 'Images/2.png',
        title: 'Кофейное с кусочками шоколада',
        weight: 2.0,
        price: 380
    },
    {
        imgUrl: 'Images/3.png',
        title: 'Клубничное с присыпкой из белого шоколада',
        weight: 1.2,
        price: 355
    },
    {
        imgUrl: 'Images/4.png',
        title: 'Крем-брюле с карамельной подливкой',
        weight: 1.5,
        price: 455
    },
    {
        imgUrl: 'Images/5.png',
        title: 'Сливочное с брусничным джемом',
        weight: 1.0,
        price: 325
    },
    {
        imgUrl: 'Images/6.png',
        title: 'Черничное с цельными ягодами',
        weight: 1.5,
        price: 410
    },
    {
        imgUrl: 'Images/7.png',
        title: 'Лимонное с карамельной присыпкой',
        weight: 1.2,
        price: 375
    },
    {
        imgUrl: 'Images/8.png',
        title: 'Сливочное с шоколадной стружкой',
        weight: 1.5,
        price: 320
    },
    {
        imgUrl: 'Images/9.png',
        title: 'Ванильное с кусочками шоколада',
        weight: 1.5,
        price: 440
    },
    {
        imgUrl: 'Images/10.png',
        title: 'Сливочное с ментоловым сиропом',
        weight: 1.8,
        price: 435
    },
    {
        imgUrl: 'Images/11.png',
        title: 'Пломбир с кусочками черного шоколада',
        weight: 1.5,
        price: 355
    },
    {
        imgUrl: 'Images/12.png',
        title: 'Сливочное с мятным сиропом',
        weight: 1.5,
        price: 420
    }
];


var basket = document.querySelector('.main-nav__link--cart');
var basketContent = document.querySelector('.main-nav__link--cart__content');
var cartPopup = document.querySelector('.cart-popup');


// Making element an element

function makeElement(tagName, className, img, alt, title, weight, price) {
    var element = document.createElement(tagName);
    element.classList.add(className);
    if(img) {
        element.src = img;
    }
    if(alt) {
        element.alt = title;
    }
    if(title !== alt) {
        element.textContent = title;
    }
    if(weight && price) {
        var total = weight * price;
        element.textContent = total + ' руб.';
    } else
    if(weight) {
        element.textContent = weight + ' кг х ';
    } else
    if(price) {
        element.textContent = price + ' руб.';
    }
    return element;
}

// Adding an element to the top of list

var addedGoods = [];

function addElement(data) {
    var block = document.createElement('div');
    block.classList.add('cart-popup__item');
    var removeBtn = document.createElement('button');
    removeBtn.classList.add('cart-popup__delete-item');
    block.appendChild(removeBtn);
    block.appendChild(makeElement('img', 'cart-popup__item-img', data.imgUrl, data.title));
    block.appendChild(makeElement('a', 'cart-popup__title-item', '', '', data.title));
    var goodWeight = makeElement('p', 'cart-popup__weight', '', '', '', data.weight);
    goodWeight.appendChild(makeElement('span', 'cart-popup__weight-cost', '', '', '', '', data.price));
    block.appendChild(goodWeight);
    block.appendChild(makeElement('span', 'cart-popup__price', '', '', '', data.weight, data.price));
    cartPopup.insertBefore(block, total);
    addedGoods.push(block);
}

// Creating total field

var total = makeElement('div', 'cart-popup__right-part');
    total.appendChild(makeElement('strong', 'cart-popup__itog', '', '', result));
    total.appendChild(makeElement('button', 'cart-popup__make-order', '', '', 'Оформить заказ'));
    if(basket.classList.contains('main-nav__link--cart--active')) {
        cartPopup.appendChild(total);
    }

// Adding class for button in total field 

var makeOrder = document.querySelector('.cart-popup__make-order');
makeOrder.classList.add('site__btn');

// Calculating result in total field 

var result = 0;

function renderTotal(data) {
    result = result + data.weight * data.price;
    var totalField = document.querySelector('.cart-popup__itog');
    totalField.textContent = 'Итого: ' + result + ' руб.';
}

// Creating event listener for button

var catalogList = document.querySelector('.goods--catalog__list');
var count = 0;

catalogList.addEventListener('click', function(evt) {
    evt.preventDefault();
    var target = evt.target;
    var goodsBtn = document.querySelectorAll('.goods__btn');
    if(target && target.classList.contains('goods__btn')) {
        count++;
        basket.classList.add('main-nav__link--cart--active');
        for(var i = 0; i <= goodsBtn.length; i++) {
            if(target == goodsBtn[i]) {
                addElement(cardsData[i]);
                renderTotal(cardsData[i]);
                console.log(cardsData[i]);
                break;
            }
        }
        if(count === 1){
            basketContent.textContent = count + ' товар';
        } else if(count > 1 && count <= 4) {
            basketContent.textContent = count + ' товара';
        } else {
            basketContent.textContent = count + ' товаров';
        }
    }
});

// Closing buttons and total substraction ////////////////////////////////////////////////////////////////

// Function for remove elements and change total substraction

function removeElement(i, oldResult) {
    var blocks = document.querySelectorAll('.cart-popup__item');
    cartPopup.removeChild(blocks[i]);
    result -= oldResult;
    var totalField = document.querySelector('.cart-popup__itog');
    totalField.textContent = 'Итого: ' + result + ' руб.';
    count--;
    if(count === 0) {
        basketContent.textContent = 'Пусто';
    } else if(count === 1){
        basketContent.textContent = count + ' товар';
    } else if(count > 1 && count <= 4) {
        basketContent.textContent = count + ' товара';
    } else {
        basketContent.textContent = count + ' товаров';
    }
    
}

// Adding event listener for closing buttons

cartPopup.addEventListener('click', function(evt) {
    evt.preventDefault();
    var target = evt.target;
    var removeButtons = document.querySelectorAll('.cart-popup__delete-item');
    if(target && target.classList.contains('cart-popup__delete-item')) {
        for(var i = 0; i <= removeButtons.length; i++) {
            if(target == removeButtons[i]) {
                var priceOfElement = addedGoods[i].lastChild.innerHTML;
                priceOfElement = priceOfElement.split(' ');
                priceOfElement = Number(priceOfElement[0]);
                addedGoods.splice(i,1);
                removeElement(i, priceOfElement);
                break;
            }
        }
    }
});


// var date = document.createElement('p');
// function getDate() {
//     date.textContent = new Date();
//     document.body.appendChild(date);
// }
// setInterval(getDate, 1000);