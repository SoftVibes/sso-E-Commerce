const fs = require('fs');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const queryJson = require("query-json");
const JsSearch = require('js-search');

app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use(cookieParser());

app.listen(8080, () => {
    console.log('Online at http://localhost:8080');
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/src/home/index.html");
});

app.get("/cart", (req, res) => {
    res.sendFile(__dirname + "/src/cart/index.html");
});

app.get("/search/:bs", (req, res) => {
    res.sendFile(__dirname + "/src/search/index.html"); 
});

app.get("/categories", (req, res) => {
    res.sendFile(__dirname + "/src/categories/index.html");
});

app.get("/product/:category/:id", (req, res) => {
    res.sendFile(__dirname + "/src/product/index.html");
});

app.get("/resource/:path", (req, res) => {
    const path = req.params.path.replace("+", "/");
    res.sendFile(__dirname + `/src/${path}`);
});

// FOR ALL PRODUCTS OF A CATEGORY WITH FILTER FUNCTIONALITY
//structure URL as : http://localhost:8080/jeans?priceRange=300,1000&size=XS,S,L
app.get("/cat/:cat_name", (req, res) => {
    category_name = req.params.cat_name;
    products = JSON.parse(fs.readFileSync(`./data/info/${category_name}.json`));
    for (var i = 0; i < products.length; i++) {
        products[i].category = category_name;
    }
    if (Object.keys(req.query).length != 0) {
        if (req.query.priceRange) {
            priceRange = req.query.priceRange.split(",").map(Number);
        } else { priceRange = NaN; }
        if (req.query.size) {
            sizeRange = req.query.size;
            sizes = sizeRange.split(",")
        }
        else { sizes = NaN; }
        function filterByValues(entry) {
            inSize = true;
            inPrice = true;
            if (sizes) {
                inSize = false;
                if (sizes.some(item => entry.size.includes(item))) {
                    inSize = true;
                }
            }
            if (priceRange) {
                inPrice = false;
                if (entry.price.some(item => (priceRange[0] <= item && item <= priceRange[1]))) {
                    inPrice = true;
                }
            }

            if (inSize && inPrice) { return true; }
            else { return false; }
        }
        var products_to_send = products.filter(filterByValues);

        res.send(JSON.stringify(products_to_send));
    }
    else {
        res.send(JSON.stringify(products));
    }

});

// FOR INDIVIDUAL PRODUCT
//structure URL as : http://localhost:8080/jeans/1
app.get("/cat/:cat_name/:id", (req, res) => {
    category_name = req.params.cat_name;
    prodId = parseInt(req.params.id);
    products = JSON.parse(fs.readFileSync(__dirname + `/data/info/${category_name}.json`));
    for (var i = 0; i < products.length; i++) {
        if (products[i].id == prodId) {
            products_to_send = products[i];
            break;
        }
    }
    products_to_send.category = category_name;
    res.send(JSON.stringify(products_to_send));
});

app.post("/find", (req, res) => {
    searchTerms = req.body.search_term.split(" ");
    var search = new JsSearch.Search('id');
    search.addIndex('name');
    search.addIndex('description');
    const folderPath = __dirname + "/data/info";
    files = fs.readdirSync(folderPath);
    /*files.forEach(file => {
        filePath = `${folderPath}/${file}`;
        products = JSON.parse(fs.readFileSync(filePath));
        search.addDocuments(products);
    });*/
    for (let i = 0; i < files.length; i++) {
        filePath = `${folderPath}/${files[i]}`;
        console.log(filePath);
        products = JSON.parse(fs.readFileSync(filePath));
        for (let j = 0; j < products.length; j++) {
            products[j].category = files[i].replace(".json", "");
        }
        search.addDocuments(products);
    }
    products_to_send = []
    for (search_term of searchTerms){
        console.log(search_term)
        products_to_send.push(search.search(search_term))
    }
    res.send(JSON.stringify(products_to_send));

    /*const regex = new RegExp(search_term, 'gmi');
    result = queryJson.search(products, regex);
        console.log(result)
        products_to_send.push(result);
    res.send(JSON.stringify(products_to_send));
    */

});


const axios = require('axios')
const csv=require('csvtojson')

async function getData () {
    console.log("Updated data");
    base_link = "https://docs.google.com/spreadsheets/d/1RQji3es53OqQgoq_XAtZdu3j9zoezkSfpSI1P7qojgE/gviz/tq?tqx=out:csv&sheet="
    cat_res = await axios.get(`${base_link}Categories`)
    categories = cat_res.data.replace(/"([^"]+(?="))"/g, '$1').split("\n")
    console.log(categories)
    for (category of categories){
        res = await axios.get(`${base_link}${category}`)
        jsonObj = await csv().fromString(res.data);
        fs.writeFileSync(`./data/info/${category}.json`, JSON.stringify(jsonObj)) ;
    }
}

setInterval(getData, 1000*60*30);

//Cookies 
app.post("/cookies", (req, res) => {
    const { product, action } = req.body;
    products = req.cookies.products;
    if (action == 'add') {
        if (products) {
            products.push(product);
        } else {
            products = [product];
        }
        res.cookie('products')
    }
}