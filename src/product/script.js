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

const url = window.location.href.split("/");
category = url[url.length - 2];
id = url[url.length - 1];
fetch(`http://localhost:8080/cat/${category}/${id}` , {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}).then((res) => {
    return res.json();
}).then((data) => {
    document.getElementById('product-name').innerHTML = data.name;
    document.getElementById('product-price').innerHTML = `$${data.price}`;
    document.getElementById('product-description').innerHTML = data.description;
    //document.getElementsByClassName('product-image')[0].src = data.image;
    document.getElementsByClassName('button-add-to-cart')[0].addEventListener('click', () => {
        cookies = document.cookie.split('=')[1];
        if (cookies != undefined) {
            cookies = JSON.parse(cookies);
            cookies.push(data);
            document.cookie = `cart=${JSON.stringify(cookies)}`;
        } else {
            document.cookie = `cart=[${JSON.stringify(data)}]`;
        }
        document.getElementsByClassName('button-add-to-cart')[0].innerHTML = '✓ Added to Cart!';
        document.getElementsByClassName('button-add-to-cart')[0].style.backgroundColor = 'green';
        document.getElementsByClassName('button-add-to-cart')[0].removeEventListener('click', () => {});
    });
});