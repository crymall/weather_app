import React from 'react';

class Widget extends React.Component {
  constructor() {
    this.state = {
      weather: null
    };
    this.getWeather = this.getWeather.bind(this);
  }

  let url = 
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Widget/>, document.getElementById('main'));
});
