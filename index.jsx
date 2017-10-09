import React from 'react';
import ReactDOM from 'react-dom';
// import merge from 'lodash/merge';

let myKey = config.MY_KEY;
let secretKey = config.SECRET_KEY;
let url = ('http://api.aerisapi.com/forecasts/11101?client_id=' +
           myKey + '&client_secret=' + secretKey);

class Widget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      weather: null,
      unit: "Farenheit"
    };
    this.getWeather = this.getWeather.bind(this);
    this.toggleC = this.toggleC.bind(this);
  }

  componentDidMount() {
    this.getWeather();
  }

  getWeather() {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.status === 200 &&
          xmlhttp.readyState === XMLHttpRequest.DONE) {
        const forecast = JSON.parse(xmlhttp.responseText);
        this.setState({weather: forecast.response[0]});
      }
    };
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
  }

  toggleC() {
    if (this.state.unit === "Farenheit") {
      this.setState({unit: "Celsius"});
    } else {
      this.setState({unit: "Farenheit"});
    }

  }

  render() {
    let foreDays = null;

    if (this.state.weather) {
      if (this.state.unit === "Farenheit") {
        foreDays = this.state.weather.periods
                       .map((day, idx) => {
                         return <div className="day-item">
                           <h3 className="day-name">{day.dateTimeISO.slice(0, 10)}</h3>
                           <img className="weather-img"
                                src={`https://raw.githubusercontent.com/crymall/weather_app/master/assets/${day.icon}?raw=true`}
                           />
                           <div className="day-temps">
                             <div className="temp-item">High: {day.maxTempC} °C</div>
                             <div className="temp-item">Low: {day.minTempC} °C</div>
                           </div>
                         </div>
                       });
      } else {
        foreDays = this.state.weather.periods
                       .map((day, idx) => {
                         return <div className="day-item">
                           <h3 className="day-name">{day.dateTimeISO.slice(0, 10)}</h3>
                           <img className="weather-img"
                                src={`https://raw.githubusercontent.com/crymall/weather_app/master/assets/${day.icon}?raw=true`}
                           />
                           <div className="day-temps">
                             <div className="temp-item">High: {day.maxTempF} °F</div>
                             <div className="temp-item">Low: {day.minTempF} °F</div>
                           </div>
                         </div>
                       });
      }
    }

    return (
      <div className="widget-container">
        <h2>NYC Weather</h2>
        <div className="widget">{foreDays}</div>
        <button className="toggle-button" onClick={this.toggleC} title="Change Units"> Change Units </button>
      </div>
    );
  }

}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Widget/>, document.getElementById('main'));
});
