import React, { Component } from 'react';
import './css/CurrentCondition.css';
class CurrentCondition extends Component {
    
    render() {
        let weatherIcon = "wi-day-sunny"
        switch(this.props.forecast.code) {

            case 30:
            case 34:
                weatherIcon = "wi-day-cloudy";
                break;
            case 47:
                weatherIcon = "wi-day-thunderstorm";
                break;
        }
    return(
        <div>
            <h3>Trenutno: <i className={"wi "+weatherIcon}></i> <span className="temp">{this.props.forecast.temp}</span></h3>
            <small>Posledni put ažurirano: {this.props.forecast.date}</small>
            <hr/>
        </div>
    );
    }
}

export default CurrentCondition;
