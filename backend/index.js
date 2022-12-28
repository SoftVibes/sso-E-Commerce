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
    res.sendFile(__dirname + "/pages/home.html");
})

// FOR ALL PRODUCTS OF A CATEGORY WITH FILTER FUNCTIONALITY
//structure URL as : http://localhost:8080/jeans?priceRange=300,1000&size=XS,S,L
app.get("/:cat_name", (req, res) => {
    category_name = req.params.cat_name;
    products = JSON.parse(fs.readFileSync(`./data/info/${category_name}.json`));
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

})

// FOR INDIVIDUAL PRODUCT
//structure URL as : http://localhost:8080/jeans/1
app.get("/:cat_name/:id", (req, res) => {
    category_name = req.params.cat_name;
    prodId = parseInt(req.params.id);
    products = JSON.parse(fs.readFileSync(`./data/info/${category_name}.json`));
    products_to_send = products.filter(entry => prodId === entry.id);
    res.send(JSON.stringify(products_to_send));
})

app.post("/search", (req, res) => {
    searchTerms = req.body.search_term.split(" ");
    var search = new JsSearch.Search('id');
    search.addIndex('name');
    search.addIndex('description');
    const folderPath = __dirname + "/data/info";
    console.log(folderPath);
    files = fs.readdirSync(folderPath);
    files.forEach(file => {
        filePath = `${folderPath}/${file}`;
        products = JSON.parse(fs.readFileSync(filePath));
        search.addDocuments(products);
    });
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

})