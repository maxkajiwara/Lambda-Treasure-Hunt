// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
// Components
import { Room } from '../../components';

import styled from 'styled-components';

const MapContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 80%;
	height: 70%;
	margin: 0 0 20px;
`;

const MapFrame = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	/* border: 1px solid lightgray; */
	margin: 20px 0;
`;

const MapWrapper = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid #1a1a1a;
`;

const Row = styled.div`
	display: flex;
`;

class Map extends Component {
	state = {};

	buildMap = () => {
		// console.log('Building map...');
		const d = this.props.map.dimensions;
		let rows = [];
		for (let i = d.n; i >= d.s; i--) {
			// console.log(`Row ${i}:`);
			let row = [];
			for (let j = d.w; j <= d.e; j++) {
				// console.log(`Room (${j},${i}):`, this.props.map[`(${j},${i})`]);
				row.push(
					<Room
						key={`(${j},${i})`}
						info={this.props.map[`(${j},${i})`]}
						current={
							this.props.map[`(${j},${i})`]
								? this.props.currentRoom.room_id ===
								  this.props.map[`(${j},${i})`].roomID
								: false
						}
					/>
				);
			}
			rows.push(<Row key={i}>{row}</Row>);
		}
		return rows;
	};

	componentDidMount() {
		const map = JSON.parse(localStorage.getItem('map'));
		this.setState({ map });
	}

	render() {
		return (
			<MapContainer>
				<MapFrame>
					{!this.props.map.dimensions ? (
						'Welcome, adventurer.'
					) : (
						<MapWrapper>{this.buildMap()}</MapWrapper>
					)}
				</MapFrame>

				{'Current Room: ' +
					(this.props.currentRoom.room_id
						? `#${this.props.currentRoom.room_id} ${
								this.props.currentRoom.coordinates
						  }`
						: '?')}
				<br />
				{'Rooms discovered: ' + Object.keys(this.props.map).length}
				<br />
				{'Path: ' + JSON.stringify(this.props.path)}
				<br />
				{`Current Cooldown: ${this.props.cooldown}s`}

				{/* <p>{`Current Room: ${JSON.stringify(this.props.currentRoom)}`}</p> */}
			</MapContainer>
		);
	}
}

const mapStateToProps = state => ({
	map: state.mapReducer.map,
	path: state.mapReducer.path,
	currentRoom: state.mapReducer.currentRoom,
	cooldown: state.mapReducer.cooldown,

	busy: state.mapReducer.busy
});

export default connect(
	mapStateToProps,
	{}
)(Map);
