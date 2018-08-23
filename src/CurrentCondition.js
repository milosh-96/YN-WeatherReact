import React, { Component } from 'react';
import './css/CurrentCondition.css';
class CurrentCondition extends Component {
    
    render() {
        let weatherIcon = "wi-day-sunny"
        switch(Number(this.props.forecast.code)) {

            case 30:
                weatherIcon = "wi-day-cloudy";
                break;
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
        <div>
            <h3>Trenutno: <i className={"wi "+weatherIcon}></i> <span className="temp">{this.props.forecast.temp}&deg;C</span></h3>
            <small>Posledni put ažurirano: {this.props.forecast.date}</small>
            <hr/>
        </div>
    );
    }
}

export default CurrentCondition;
