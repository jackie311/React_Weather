import React, {Component} from 'react';


import CityCondition   from './CityCondition';
import Forecaster   from './Forecaster';
import Toolbar      from './Toobar';


export default class WeatherChannel extends Component {
	constructor(props) {
		super(props);
			this.state = {
			// some dummy data for initial state
			condition: {
				city:  '--',
				temp: '--',
				weather: '--'
			},
			days: [
				{weekday: '--', high:23, low:18, icon:'http://icons.wxug.com/i/c/k/clear.gif'},
				{weekday: '--', high:29, low:18, icon:'http://icons.wxug.com/i/c/k/chancerain.gif'},
				{weekday: '--', high:20, low:10, icon:'http://icons.wxug.com/i/c/k/chancerain.gif'},
				{weekday: '--', high:20, low:10, icon:'http://icons.wxug.com/i/c/k/chancerain.gif'},
				{weekday: '--', high:20, low:10, icon:'http://icons.wxug.com/i/c/k/chancerain.gif'}
			]
		}
	}

	onConditionLoad(data) {
		const condition = {
			city: data.display_location.full,
			weather: data.weather,
			temp: `${data.temp_c}c`
		}
		//console.log(condition);
		this.setState({condition});
	}
	onForecastLoad(data) {
		const days = data.map(d => ({
				weekday: d.date.weekday,
				high: d.high.celsius, low: d.low.celsius,
				icon: d.icon_url,
        avehumidity: d.avehumidity
			})
		);
		console.log(days);
		this.setState({days})
	}

	render() {
		return (
			<main>
				<Toolbar
					// Pass callback fn as props to child
					// when data is ready, child will invoke it and state will be updated
					onConditionLoad={data => this.onConditionLoad(data)}
					onForecastLoad={data => this.onForecastLoad(data)}
				/>
				<section id="left">
					<CityCondition {...this.state.condition} />
				</section>
				<section id="right">
					<Forecaster days={this.state.days} />
				</section>
			</main>
		)
	}
}
