/* Categories section bs */
categories_element = document.getElementsByClassName('categories')[0];
main_element = document.getElementsByClassName('main-page')[0];
team_element = document.getElementsByClassName('team')[0];
shop_now = document.getElementsByClassName('shop-now')[0];
features_element = document.getElementsByClassName('features')[0];

/* Category underline bs */

buttons = document.getElementsByClassName('button-navbar');
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
        //if (document.getElementsByClassName('active')[0] == this) return;
        document.getElementsByClassName('active')[0].classList.remove('active');
        buttons[i].classList.add('active');
    });
}


document.getElementsByClassName('button-cart')[0].addEventListener('click', () => {
    document.getElementsByClassName('button-cart')[0].setAttribute('dot', 'true')
})


/* swiper trollin */

var swiper = new Swiper(".mySwiper", {
    effect: "fade",
    grabCursor: true,
    loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
    },
});

var swiper2 = new Swiper(".mySwiper2", {
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    autoplay: {
        delay: 1500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

/* Search bar bs */
document.getElementsByClassName('input-search')[0].addEventListener('keyup', (key) => {
    if (key.key == 'Enter') {
        keywords = document.getElementsByClassName('input-search')[0].value.replace(" ", "+");
        window.location.href = `http://localhost:8080/search/${keywords}`;
    }
});

document.getElementsByClassName('button-cart')[0].addEventListener('click', function () {
    window.location.href = 'http://localhost:8080/cart';
});

document.getElementsByClassName('button-categories')[0].addEventListener('click', function () {
    window.location.href = 'http://localhost:8080/categories';
});

document.getElementsByClassName('button-home')[0].addEventListener('click', function () {
    window.location.href = 'http://localhost:8080/';
});



/* Getting Cart from cookies */

cookie = document.cookie.split("=")[1];

if (cookie == undefined) {
    document.getElementById('items').innerHTML = '<h3>No Products in Cart :(</h3>';
} else {
    cookie = JSON.parse(cookie);
    console.log(cookie);
    document.getElementById('items').innerHTML = '';
    for (let i = 0; i < cookie.length; i++) {
        document.getElementById('items').innerHTML += `
        <div class="item">
            <div class="item-image  ${cookie[i].color}">
                <img src="${cookie[i].image}" alt="">
            </div>
            <div class="item-info">
                <h3>${cookie[i].name}</h3>
                <p>${cookie[i].color}</p>
                <p>${cookie[i].size}</p>
                <p>${cookie[i].price}</p>
            </div>
        </div>
        `;
    }
}