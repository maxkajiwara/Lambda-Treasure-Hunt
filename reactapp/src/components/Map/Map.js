// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';

const MapContainer = styled.div`
	display: flex;
	align-items: center;
	height: 70%;
`;

class Map extends Component {
	state = {};

	componentDidMount() {
		const map = JSON.parse(localStorage.getItem('map'));
		this.setState({ map });
	}

	render() {
		return <MapContainer>Map</MapContainer>;
	}
}

const mapStateToProps = state => ({
	currentRoom: state.mapReducer.currentRoom
});

export default connect(
	mapStateToProps,
	{}
)(Map);
