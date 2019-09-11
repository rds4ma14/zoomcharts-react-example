const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
// const solr = require('./../src/Solr')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
    next();  
  });

app.get('/solr/', (req, res) => {

  const SolrNode = require('solr-node');

  var client = new SolrNode({
    host: '127.0.0.1',
    port: '8983',
    core: 'collection1',
    protocol: 'http'
  });

  let consulta1 = client.query().q({text:'test', title:'test'});
  let consulta2 = 'q=*%3A*&wt=json';
  // console.log('consulta',consulta1.params);
  var result = client.search(consulta2)
      .then(function (result, resolve) {
        console.log('Response:', result.response.docs);        
      })
      .catch(function(err) {
        console.error(err);
      });

  
  console.log('oibonitono', result);
  res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="utf-8">
  <title></title>
  </head>
  <body>
      <span>Hello genti bonita</span>
      <span>${result}</span>
  </body>
  </html>`)
});

app.get('/solrr/', (req, res) => {
  //   const name = req.query.name || 'World';
  //   res.setHeader('Content-Type', 'application/json');
  //   res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.listen(9001, () =>
  console.log('Express server is running on localhost:9001')
);