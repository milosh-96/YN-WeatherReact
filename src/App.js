import React, { Component } from 'react';
import CurrentCondition from './CurrentCondition';
import ForecastCard from './ForecastCard';
import './css/main.css';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {params:{city:"Belgrade"},temperatura:30,data:{},dataReady:false,updated:false,};
  }

  weatherIcon(code) {
    let weatherIcon = "wi-solar-eclipse"
        switch(Number(code)) {
            case 11:
                return "wi-day-rainy"
            case 28:
            case 30:
            case 34:
                return "wi-day-cloudy";
            case 47:
                return "wi-day-thunderstorm";
            default:
                return weatherIcon;
        }
  }

  makeApiCall = (val) => {
    const apiUrl = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"+val+"%22)%20and%20u%3D%27c%27&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

    fetch(apiUrl).then((resp)=>{
      return resp.json();
    }).then((data)=>{
      this.setState({data:data.query,dataReady:true,updated:true});
    });
  }

  componentDidMount() {
    this.makeApiCall(this.state.params.city);
  }
  
  componentDidUpdate() {
    setTimeout(() => {
      this.setState({updated:false});
    },5000);
  }
  updateCity() {
    this.makeApiCall(this.refs.city_input.value);
  } 
  render() {
    let display = '...';
    let updated = '<p></p>';
    let location = this.state.params.city;
    let currentCondition = <div>Učitavanje...</div>;
    if(this.state.updated) {
      updated = <p>Upravo ažurirano.</p>;
    }
    else {
      updated = <p></p>;
    }
    if(this.state.dataReady) {
      display = this.state.data.results.channel.item.forecast.map((item) => {
          return <ForecastCard key={item.date} forecast={item} icon={this.weatherIcon(item.code)} />;
      });
      location = this.state.data.results.channel.location.city + ", " + this.state.data.results.channel.location.country;
      let currentCondValues = this.state.data.results.channel.item.condition;
      console.log(currentCondValues.code);
      
      currentCondition = <CurrentCondition forecast={currentCondValues} icon={this.weatherIcon(currentCondValues.code)} />;
    }
    else {
      display = <div>Pričekajte...</div>
    }
    return (
      <div id="wrapper">
      <div className="form-group">
      <label htmlFor="city_input">Enter a city and state: </label>
      <input type="text" id="city_input" ref="city_input" className="form-control"/>
      <button onClick={this.updateCity.bind(this)}>Ok</button>
      </div>
      <div className="content">
        {currentCondition}
        <h2>{location}</h2>
        {updated}
        {display}
        </div>
      </div>
    );
  }
}

export default App;
