import React from 'react';
//import ReactDOM from "react-dom";
import * as d3 from 'd3';

//import "./styles.css";
import MySankey from './MySankey';

import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  state = { data: null, width: 0, height: 0 };
  svgRef = React.createRef();

  componentDidMount() {
    d3.json('/ugr-sankey-openspending.json').then(data =>
      this.setState({ data })
    );
    this.measureSVG();
    window.addEventListener('resize', this.measureSVG);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.measureSVG);
  }

  measureSVG = () => {
    const { width, height } = this.svgRef.current.getBoundingClientRect();

    this.setState({
      width,
      height
    });
  };

  render() {
    const { data, width, height } = this.state;

    return (
      <div className='App'>
        <h1>Let's build a Sankey diagram</h1>
        <h2>#ReactVizHoliday Day 11</h2>
        <svg width='100%' height='600' ref={this.svgRef}>
          {data && <MySankey data={data} width={width} height={height} />}
        </svg>
      </div>
    );
  }
}

//const rootElement = document.getElementById("root");
//ReactDOM.render(<App />, rootElement);
export default App;
