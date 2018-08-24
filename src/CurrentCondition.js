import React, { Component } from 'react';
import './css/CurrentCondition.css';
class CurrentCondition extends Component {
    render() {
        let weatherIcon = this.props.icon;
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
