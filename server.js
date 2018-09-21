require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const fetch = require('node-fetch');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/reviews/:productId', (req, res) => {
  fetch(`http://localhost:1337/reviews/${req.params.productId}`)
    .then((res) => {
      return res.json();
    })
    .then(json => res.send(json));
});

app.get('/api/helpful/:productId', (req, res) => {
  fetch(`http://localhost:1337/helpful/${req.params.productId}`)
    .then((res) => {
      // do nothing
    })
    .then(json => res.status(202).send());
});

app.get('/api/checkout/:productId', (req, res) => {
  fetch(`http://localhost:7777/checkout/${req.params.productId}`)
    .then((res) => {
      return res.json();
    })
    .then(json => res.send(json));
});

app.get('/api/relatedItems', (req, res) => {
  fetch(`http://localhost:4043/product?id=${req.query.id}`)
    .then((res) => {
      return res.json();
    })
    .then(json => res.send(JSON.stringify(json)));
});

app.get('/api/products/', (req, res) => {
  fetch(`http://localhost:9001/get?id=${req.query.id}`)
    .then(response => {
      return response.json()
    }).then(json => {
      res.send(json)
    });
});

app.listen(port, () => {
  console.log(`AVH proxy server listening on port ${port}...`);
});
