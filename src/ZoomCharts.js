import React, { Component } from 'react';
import zc from '@dvsl/zoomcharts';
const TimeChart = zc.TimeChart;
const license = require("./License.json");


const SolrNode = require('solr-node');

// console.log(SolrNode);

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
    .then(function(result) {
      console.log('Response:', result.response);
    })
    .catch(function(err) {
      console.error(err);
    });


// Zoomcharts license and license key
window.ZoomChartsLicense = license.License;
window.ZoomChartsLicenseKey = license.LicenseKey;

class ZoomCharts extends Component {
  
  componentDidMount () {
   
    //
    var t = new TimeChart({
      container: document.getElementById('chartTimeChart'),
      assetsUrlBase:'./../node_modules/@dvsl/zoomcharts/lib/assets',
      area: { height: 350 },
      data: {
        preloaded: {
          values: [
            ['2017-01-09 00:00:00', 100],
            ['2017-01-20', 200],
            ['2017-01-29', 300],
            ['2017-02-05 15:20:00', 400],
            ['2017-02-15 22:59:59', 500],
            ['2017-02-18 13:59:59', 200],
            ['2017-02-25', 500]


          ],
          dataLimitFrom: '2017-01-09 00:00:00',
          dataLimitTo: '2017-02-25 22:59:59',
          unit: 's'
        }
      }
    })
  }

  render () {
    return (
      <div className="chart-wrapper">
        <div id="chartTimeChart" className="chart"></div>
      </div>
    )
  }
}

export default ZoomCharts;
