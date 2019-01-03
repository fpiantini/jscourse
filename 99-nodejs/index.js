const fs = require('fs');
const http = require('http');
const url = require('url');

const jsonData = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');

const laptopData = JSON.parse(jsonData);

console.log(laptopData);

const server = http.createServer((req, res) => {

    const pathName = url.parse(req.url, true).pathname;

    // PRODUCT OVERVIEW -------------------------------------------------
    if (pathName === '/' || pathName === '/products') {
        res.writeHead(200, {'Content-type': 'text/html'});

        fs.readFile(`${__dirname}/templates/template-overview.html`, 'utf-8', (err, data) => {
            let overviewOutput = data;
            fs.readFile(`${__dirname}/templates/template-card.html`, 'utf-8', (err, data) => {
                const cardOutput = laptopData.map(el => replaceTemplate(data, el)).join('');

                overviewOutput = overviewOutput.replace(/{%CARDS%}/g, cardOutput);
                res.end(overviewOutput);
            });
        });
    }
    
    // LAPTOP DETAILS --------------------------------------------------
    else if (pathName === '/laptop' ) {
        const laptopId = url.parse(req.url, true).query.id;
        if (laptopId && laptopId < laptopData.length) {
            res.writeHead(200, {'Content-type': 'text/html'});
            
            fs.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8', (err, data) => {
                const laptop = laptopData[laptopId];
                const output = replaceTemplate(data, laptop);
                res.end(output);
            });
        } else {
            res.writeHead(404, {'Content-type': 'text/html'});
            res.end(`ERROR: Page not found in the server`);
        }
    }

    // IMAGES ----------------------------------------------------------
    else if ((/\.(jpg|jpeg|png|gif)$/i).test(pathName)) {
        fs.readFile(`${__dirname}/data/img${pathName}`, (err,data) => {
            res.writeHead(200, {'Content-type': 'image/jpg'});
            res.end(data);
        });
    }

    // STYLE SHEET -----------------------------------------------------
    else if ((/\.css$/i).test(pathName)) {
        fs.readFile(`${__dirname}/css${pathName}`, (err,data) => {
            res.writeHead(200, {'Content-type': 'text/css'});
            res.end(data);
        });
    }

    // NOT FOUND -------------------------------------------------------
    else {
        res.writeHead(404, {'Content-type': 'text/html'});
        res.end('ERROR: Page not found in the server');
    }
});

server.listen(1337, 'localhost', () => {
    console.log('Server started');
});

function replaceTemplate(originalHtml, laptop) {
    let output = originalHtml.replace(/{%PRODUCTNAME%}/g, laptop.productName);
    output = output.replace(/{%IMAGE%}/g, laptop.image);
    output = output.replace(/{%PRICE%}/g, laptop.price);
    output = output.replace(/{%SCREEN%}/g, laptop.screen);
    output = output.replace(/{%CPU%}/g, laptop.cpu);
    output = output.replace(/{%STORAGE%}/g, laptop.storage);
    output = output.replace(/{%RAM%}/g, laptop.ram);
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
    output = output.replace(/{%ID%}/g, laptop.id);
    return output;
}