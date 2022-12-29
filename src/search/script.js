/* Categories section bs */
categories_element = document.getElementsByClassName('categories')[0];
main_element = document.getElementsByClassName('main-page')[0];
team_element = document.getElementsByClassName('team')[0];
feature_element = document.getElementsByClassName('features')[0];
shop_now = document.getElementsByClassName('shop-now')[0];

/*document.getElementsByClassName('button-teams')[0].addEventListener('click', () => {
    if (document.getElementsByClassName('button-teams')[0].classList.contains('active')) return;
    toggle('team');
});

shop_now.addEventListener('click', () => {
    toggle('categories');
})
*/ 
/* default */

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

const search_icon = document.getElementsByClassName('search-icon')[0]
search_icon.addEventListener('click', () => {
    if (search_icon.value == '') return;
    window.location.href = 'http://localhost:8080/search';
});












/* Implementing Backend */
url = window.location.href.split('/');
search_keywords = url[url.length - 1].replace("+", " ");
document.getElementsByClassName('input-search')[0].value = search_keywords.replace("+", " ");
fetch("http://localhost:8080/find", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        search_term: search_keywords
    })
}).then((res) => {
    return res.json();
}).then((data) => {
    data = data[0];
    console.log(data);
    if (data.length == 0) {
        document.getElementById('products').innerHTML = `<h1>No products found for "${search_keywords.replace("+", " ")}"</h1>`;
        return;
    }
    for (let i = 0; i < data.length; i++) {
        document.getElementById('products').innerHTML += `
        <div class="product">
            <img src="` + "http://localhost:8080/resource/img+" + `rossum.jpg" class="product-img">
            <div class="product-overlay">
                <p class="product-text">${data[i].name}</p>
                <p class="product-price">${data[i].price}</p>
            </div>
        </div>
        `
    }
});