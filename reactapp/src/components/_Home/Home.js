// Dependencies
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// Components
import { Map, Controls, Info, Inventory } from '../../components';

import styled from 'styled-components';

const HomeContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100%;
`;

class Home extends Component {
	render() {
		return (
			<HomeContainer>
				<Map />
				<Controls />
				<Info />
				<Inventory />
			</HomeContainer>
		);
	}
}

export default Home;
