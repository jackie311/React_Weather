import React, {Component} from 'react';

const CONDITION_BASE_URL = 'http://api.wunderground.com/api/f029e46fd0232d12/geolookup/conditions/q/Australia/';
const FORECAST_BASE_URL = 'http://api.wunderground.com/api/f029e46fd0232d12/geolookup/forecast7day/q/Australia/';

export default class Toolbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			curCity: 'Adelaide'
		}
		this._conditionXHR = new XMLHttpRequest();
		// attach callback fn and use arrow fn to ensure 'this' got proper
		// ref to Toolbar instance itself, (there is other way to deal with 'this')
		// if you dare, try:
		// this._conditionXHR.onload = this.handleConditionData
		this._conditionXHR.onload = () => {this.handleConditionData()};

		this._forecastXHR = new XMLHttpRequest();
		this._forecastXHR.onload = () => {this.handleForecastData()}
	}

	fetchConditionData(curCity) {
		this._conditionXHR.open('GET', `${CONDITION_BASE_URL}${curCity}.json`, true);
		this._conditionXHR.send();
	}
	handleConditionData() {
		const xhr = this._conditionXHR;
		if (xhr.status === 200) {
			const respData = JSON.parse(xhr.responseText);
			console.log(respData.current_observation);
			// IMPORTANT
			// time to invoke callback from parent <WeatherChannel />
			// when data is ready, like telling the parent
			// 'hey, data is ready, you can update your state now'
			this.props.onConditionLoad(respData.current_observation);

		} else {
			alert(`Failed to load weather condition: ${xhr.status}`)
		}
	}

	fetchForecastData(curCity) {
		this._forecastXHR.open('GET', `${FORECAST_BASE_URL}${curCity}.json`, true);
		this._forecastXHR.send();
	}
	handleForecastData() {
		const xhr = this._forecastXHR;
		if (xhr.status === 200) {
			const respData = JSON.parse(xhr.responseText);
      console.log(respData.forecast.simpleforecast.forecastday);
			this.props.onForecastLoad(respData.forecast.simpleforecast.forecastday)

		} else {
			alert(`Failed to load weather condition: ${xhr.status}`)
		}
	}

	// kick off initial request when comp mounted
	componentDidMount() {
		const {curCity} = this.state;
		this.refresh(curCity);
		// this.fetchConditionData(curCity);
		// this.fetchForecastData(curCity);
	}

	// clean up resource when comp unmounted
	componentWillUnmount() {
		this._conditionXHR = null;
		this._forecastXHR = null;
	}

	refresh() {
		const {curCity} = this.state;
		this.fetchConditionData(curCity);
		this.fetchForecastData(curCity);
	}

	render() {
		return (
			<nav style={{padding:10}}>
				<input type="text" onChange={(e) => this.setState({curCity: e.target.value})} />
				<button onClick={() => {this.refresh()}}>Load</button>

				
			</nav>
		)
	}
}
