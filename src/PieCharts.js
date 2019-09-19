import React, { Component } from 'react';
import zc from '@dvsl/zoomcharts';
const PieChart = zc.PieChart;
const license = require("./License.json");
const data = require("./resultado.json");

// Zoomcharts license and license key
window.ZoomChartsLicense = license.License;
window.ZoomChartsLicenseKey = license.LicenseKey;

class PieCharts extends Component {
  
    componentDidMount () {

        var chart = new PieChart({
            container: document.getElementById('pieChart'),
            assetsUrlBase:'./../node_modules/@dvsl/zoomcharts/lib/assets',
            area: { height: 500 },
            interaction: {
                mode: "select",
                resizing: {
                    enabled: false
                }
            },
            pie: {
                innerRadius: 0
            },
            slice: {
                expandableMarkStyle: {
                    lineWidth: 0
                }
            },

            data: { 
              
                preloaded: data                    
                
             },
            
             toolbar: {
                fullscreen: true,
                enabled: true
            }
        })
    }

    render () {
        return (
            <div className="chart-wrapper">
            <div id="pieChart" className="chart"></div>
            </div>
        )
    }
}

export default PieCharts;
