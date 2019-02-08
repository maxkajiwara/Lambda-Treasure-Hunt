// Dependencies
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

// Components
import { Home } from '../../components';

//Styles
const AppContainer = styled.div`
	display: flex;
	max-width: 1280px;
	/* height: 100vh; */
	color: white;
	background: #1a1a1a;
	margin: 0 auto;
`;

class App extends Component {
	render() {
		return (
			<AppContainer>
				{/* <Navbar /> */}
				<Route exact path="/" component={Home} />
			</AppContainer>
		);
	}
}

export default App;
