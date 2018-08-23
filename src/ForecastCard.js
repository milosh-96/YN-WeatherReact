import React, { Component } from 'react';
import './css/ForecastCard.css';
class ForecastCard extends Component {
    
    render() {
        let weatherIcon;
        switch(Number(this.props.forecast.code)) {

            case 30:
            case 34:
                weatherIcon = "wi-day-cloudy";
                break;
            case 47:
                weatherIcon = "wi-day-thunderstorm";
                break;
            default:
                weatherIcon = "wi-day-sunny"
        }
    return(
        <div className="card">
        <div className="card-heading">{this.props.forecast.date}</div>
        <div className="card-body">
           <div className="container">
            <div className="row">
            <div className="forecastIcon col-3"><i className={"wi " + weatherIcon}></i></div>
            <div className="col-3">
                <div className="tempBig minTemp">{this.props.forecast.low}&deg;C</div>
            </div>
            <div className="col-3">
                <div className="tempBig maxTemp">{this.props.forecast.high}&deg;C</div>
            </div>
            </div>
           </div>
           </div>
        </div>
           );
    }
}

export default ForecastCard;
