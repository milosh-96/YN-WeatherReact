import React, { Component } from 'react';
import ForecastCard from './ForecastCard';
import './css/main.css';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {params:{city:"Belgrade,Serbia"},temperatura:30,data:{},dataReady:false,updated:false,};
  }
  componentDidMount() {
    const apiUrl = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22belgrade,serbia%22)%20and%20u%3D%27c%27&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

    fetch(apiUrl).then((resp)=>{
      return resp.json();
    }).then((data)=>{
      this.setState({data:data.query,dataReady:true,updated:true});
    });
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.setState({updated:false});
    },5000);
  }

 
  render() {
    let display = '...';
    let updated = '<p></p>';
    let location = this.state.params.city;
    if(this.state.updated) {
      updated = <p>Upravo ažurirano.</p>;
    }
    else {
      updated = <p></p>;
    }
    if(this.state.dataReady) {
      display = this.state.data.results.channel.item.forecast.map((item) => {
          return <ForecastCard key={item.date} forecast={item} />;
      });
      location = this.state.data.results.channel.location.city + ", " + this.state.data.results.channel.location.country;
    }
    else {
      display = <div>Pričekajte...</div>
    }
    return (
      <div id="wrapper">
      <div className="content">
        <h2>{location}</h2>
        {updated}
        {display}
        </div>
      </div>
    );
  }
}

export default App;
