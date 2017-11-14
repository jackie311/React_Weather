import React from 'react';

function DailyItem(props) {
	const day = props.day;
	return (
		<div className="item">
			<span>{day.weekday}</span>
			<span><img src={day.icon} /></span>
			<span>{day.high}</span>
			<span>{day.low}</span>
      <span>{day.avehumidity}</span>
		</div>
	)
}
export default function Forecaster(props) {
	return props.days.map(
		(day, i) => <DailyItem key={`${day.weekday}_${i}`} day={day} />
	)
}
