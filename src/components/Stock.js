import React from 'react'
import Plot from 'react-plotly.js';

class Stock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        stockChartXValues: [],
        stockChartYValues: []
      }
    }
  
    componentDidMount() {
      this.fetchStock();
    }
  
    fetchStock() {
      const pointerToThis = this;
      console.log(pointerToThis);
      const API_KEY = ' 2OQYC140X6ZFK94D';
      let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=demo`;
      let stockChartXValuesFunction = [];
      let stockChartYValuesFunction = [];
  
      fetch(API_Call)
        .then(
          function(response) {
            return response.json();
          }
        )
        .then(
          function(data) {
            console.log(data);
  
            for (var key in data['Time Series (Daily)']) {
              stockChartXValuesFunction.push(key);
              stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
            }
  
            // console.log(stockChartXValuesFunction);
            pointerToThis.setState({
              stockChartXValues: stockChartXValuesFunction,
              stockChartYValues: stockChartYValuesFunction
            });
          }
        )
    }
  
    render() {
      return (
        <div>
        <h1>Stock Market</h1>
          <Plot
            data={[
              {
                x: this.state.stockChartXValues,
                y: this.state.stockChartYValues,
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'red'},
              }
            ]}
            layout={{width: 520, height: 340, title: 'IBM STOCK PAST 5 MONTHS'}}
          />
        </div>
      )
    }
  }
  
  export default Stock;