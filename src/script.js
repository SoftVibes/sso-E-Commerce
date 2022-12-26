/* Categories section bs */

function toggleCategories() {
    elem = document.getElementsByClassName('categories')[0];
    elem2 = document.getElementsByClassName('main-page')[0];

    if (elem.style.display == 'none') {
        elem.style.display = 'flex';
        elem2.style.display = 'none';
    } else {
        elem.style.display = 'none';
        elem2.style.display = 'grid';
    }
}

document.getElementsByClassName('button-categories')[0].addEventListener('click', toggleCategories);
document.getElementsByClassName('button-home')[0].addEventListener('click', toggleCategories);
document.getElementsByClassName('categories')[0].style.display = 'none';

/* Category underline bs */

buttons = document.getElementsByClassName('button-navbar');
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
        document.getElementsByClassName('active')[0].classList.remove('active');
        this.classList.add('active');
    });
}

toggleCategories();