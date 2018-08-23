import React, { Component } from 'react';
import './css/main.css';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {temperatura:30,data:{},dataReady:false};
  }
  componentDidMount() {
    const apiUrl = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22nome%2C%20ak%22)%20and%20u%3D'c'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

    fetch(apiUrl).then((resp)=>{
      return resp.json();
    }).then((data)=>{
      this.setState({data:data.query,dataReady:true});
    });
  }

  componentDidUpdate() {
    alert("YUP");
  }

  updateTemp() {
    this.setState({temperatura:this.state.temperatura + 1})
  }
  render() {
    let display = '...';
    if(this.state.dataReady) {
      display = this.state.data.results.channel.item.forecast.map((item) => {
          return <div key={item.date}>
                  Datum: {item.date}
                  <p>Najviša: {item.high}</p>
                  <p>{item.text}</p>
                  <hr/>
                </div>
      });
    }
    else {
      display = <div>Pričekajte...</div>
    }
    return (
      <div id="wrapper">
      <button onClick={this.updateTemp.bind(this)}>++</button>
      {display}
      </div>
    );
  }
}

export default App;
