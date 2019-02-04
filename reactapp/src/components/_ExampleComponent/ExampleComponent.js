// Dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import styled from 'styled-components';

class ExampleComponent extends Component {
	render() {
		return (
			<div className="ExampleComponent">
				<Link to="/">Home</Link>
			</div>
		);
	}
}

export default ExampleComponent;
