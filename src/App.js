import React, { Component } from 'react';
import logo from './logo.svg';
import './css/weather.css';

//import ClockList from './comp/ClockList';
import Header  from './weather/Header';
import Footer  from './weather/Footer';
import WeatherChannel from './weather/WeatherChannel';

class App extends Component {
  render() {
    return (
      <div id="wrapper">
        <Header />
        <WeatherChannel />
        <Footer />
      </div>
    );
  }
}

//function App() {
//  return <ClockList />
//}

export default App;
