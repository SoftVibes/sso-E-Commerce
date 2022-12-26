/* Categories section bs */
categories_element = document.getElementsByClassName('categories')[0];
main_element = document.getElementsByClassName('main-page')[0];
team_element = document.getElementsByClassName('team')[0];
about_element = document.getElementsByClassName('about')[0];
function toggle(ref) {
    var ele = null;
    switch (ref) {
        case 'categories':
            ele = categories_element
        case 'team':
            ele = team_element
        case 'about':
            ele = about_element
        default:
            ele = main_element
    }

    if (ele.style.display == 'none') {
        categories_element.style.display = 'flex';
        main_element.style.display = 'none';
    } else {
        categories_element.style.display = 'none';
        main_element.style.display = 'grid';
    }
}

document.getElementsByClassName('button-categories')[0].addEventListener('click', () => {
    if (document.getElementsByClassName('button-categories')[0].classList.contains('active')) return;
    toggleCategories()
});
document.getElementsByClassName('button-home')[0].addEventListener('click', () => {
    if (document.getElementsByClassName('button-home')[0].classList.contains('active')) return;
    toggleCategories()
});
document.getElementsByClassName('button-')
document.getElementsByClassName('categories')[0].style.display = 'none';

/* Category underline bs */

buttons = document.getElementsByClassName('button-navbar');
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
        //if (document.getElementsByClassName('active')[0] == this) return;
        document.getElementsByClassName('active')[0].classList.remove('active');
        this.classList.add('active');
    });
}


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