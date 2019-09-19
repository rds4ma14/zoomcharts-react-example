const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
var fs = require('fs');

// const solr = require('./../src/Solr')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
    next();  
  });

app.get('/solr/', async (req, res) => {

  const SolrNode = require('solr-node');

  var client = new SolrNode({
    host: '127.0.0.1',
    port: '8983',
    core: 'my-core',
    protocol: 'http'
  });

  let consulta1 = client.query().q({text:'test', title:'test'});

  // let consulta2 = 'q=*%3A*&wt=json';
  let consulta3 = 'q=*%3A*&rows=20&wt=json';
  
  var results = await client.search(consulta3)
      .then(function (result, resolve) {
        console.log('Response:', result.response.docs);
        return result.response.docs;        
      })
      .catch(function(err) {
        console.error(err);
      });
      
      // resultsJson = JSON.stringify(results);
      // console.log('JSON',resultsJson);

    var data = results.map(function(result) {
      // console.log('testinho', result);   
      return {id:result.id, name:result.name[0], value:result.price[0]};
    });

  data = {subvalues:data};
  
  fs.writeFile('./src/resultado.json', JSON.stringify(data, null, 4), function(err) {
    console.log('JSON escrito com sucesso!')
  })


  console.log('oi bonitono', data);
  
  res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="utf-8">
  <title></title>
  </head>
  <body>
      <span>Hello genti bonita</span><br>
      <ul></ul>
  </body>
  </html>`)
});


app.listen(9001, () =>
  console.log('Express server is running on localhost:9001')
);