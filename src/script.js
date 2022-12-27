/* Categories section bs */
categories_element = document.getElementsByClassName('categories')[0];
main_element = document.getElementsByClassName('main-page')[0];
team_element = document.getElementsByClassName('team')[0];
feature_element = document.getElementsByClassName('features')[0];
shop_now = document.getElementsByClassName('shop-now')[0];

function toggle(ref) {
    if (ref == 'categories') {
        categories_element.style.display = 'flex';
        main_element.style.display = 'none';
        team_element.style.display = 'none';
        feature_element.style.display = 'none';
        return;
    }

    if (ref == 'team') {
        categories_element.style.display = 'none';
        main_element.style.display = 'none';
        feature_element.style.display = 'none';
        team_element.style.display = 'block';
        return;
    }

    if (ref == 'home') {
        if (!window.location.href.endsWith('/index.html')) {
            window.location.href = '/src/index.html';
            return;
        }
        categories_element.style.display = 'none';
        main_element.style.display = 'grid';
        team_element.style.display = 'none';
        feature_element.style.display = 'flex';
        return;
    }
}

document.getElementsByClassName('button-categories')[0].addEventListener('click', () => {
    if (document.getElementsByClassName('button-categories')[0].classList.contains('active')) return;
    toggle('categories');
});
document.getElementsByClassName('button-home')[0].addEventListener('click', () => {
    if (document.getElementsByClassName('button-home')[0].classList.contains('active')) return;
    toggle('home');
});

document.getElementsByClassName('button-teams')[0].addEventListener('click', () => {
    if (document.getElementsByClassName('button-teams')[0].classList.contains('active')) return;
    toggle('team');
});

shop_now.addEventListener('click', () => {
    toggle('categories');
})

/* default */
document.getElementsByClassName('categories')[0].style.display = 'none';

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



/* Search bar bs */
document.getElementById('search').addEventListener('keyup', (key) => {
    if (key.key == 'Enter') {
        window.location.href = 'search.html';
    }
});

document.getElementsByClassName('button-cart')[0].addEventListener('click', function () {
    window.location.href = 'cart.html';
});

