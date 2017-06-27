import React from 'react';
import styles2 from './NotFound.scss';

console.log('NotFound')

class NotFound extends React.Component {

	render() {
		console.log('abc')
		return (
			<div className="NotFound">
		        <div className="not-found">
			          not found
		        </div>
		    </div>
		)
	}

}


module.exports = NotFound;