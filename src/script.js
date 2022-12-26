/* Categories section bs */

function toggleCategories() {
    categories_element = document.getElementsByClassName('categories')[0];
    main_element = document.getElementsByClassName('main-page')[0];

    if (categories_element.style.display == 'none') {
        categories_element.style.display = 'flex';
        main_element.style.display = 'none';
    } else {
        categories_element.style.display = 'none';
        main_element.style.display = 'grid';
    }
}

document.getElementsByClassName('button-categories')[0].addEventListener('click', () => {
    console.log(document.getElementsByClassName('button-categories')[0].classList)
    if (document.getElementsByClassName('button-categories')[0].classList.contains('active')) return;
    toggleCategories()
});
document.getElementsByClassName('button-home')[0].addEventListener('click', () => {
    if (document.getElementsByClassName('button-home')[0].classList.contains('active')) return;
    toggleCategories()
});
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
    effect: "cube",
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });