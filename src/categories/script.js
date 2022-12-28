/* Search bar bs */
document.getElementById('search').addEventListener('keyup', (key) => {
    if (key.key == 'Enter') {
        window.location.href = 'http://localhost:8080/search';
    }
});

document.getElementsByClassName('button-cart')[0].addEventListener('click', function () {
    window.location.href = 'http://localhost:8080/cart';
});

document.getElementsByClassName('button-categories')[0].addEventListener('click', function () {
    window.location.href = 'http://localhost:8080/categories';
});

const search_icon = document.getElementsByClassName('search-icon')[0]
search_icon.addEventListener('click', () => {
    if (search_icon.value == '') return;
    window.location.href = 'http://localhost:8080/search';
});