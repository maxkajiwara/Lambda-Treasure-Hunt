// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import { Room } from '../../components';

// Actions
import { updatePath } from '../../actions';

import styled from 'styled-components';

const MapContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 700px;
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
	border: 3px solid #1a1a1a;
`;

const Row = styled.div`
	display: flex;
`;

class Map extends Component {
	state = {};

	buildMap = () => {
		const path = this.props.path.map(room => room[1]);

		// console.log('Building map...');
		const d = this.props.map.dimensions;
		let rows = [];
		for (let i = d.n; i >= d.s; i--) {
			// console.log(`Row ${i}:`);
			let row = [];
			for (let j = d.w; j <= d.e; j++) {
				// console.log(`Room (${j},${i}):`, this.props.map[`(${j},${i})`]);
				const coords = `(${j},${i})`;

				row.push(
					<Room
						key={coords}
						info={this.props.map[coords]}
						current={
							this.props.map[coords] &&
							this.props.currentRoom.room_id === this.props.map[coords].roomID
						}
						path={
							this.props.map[coords] &&
							path.includes(this.props.map[coords].roomID)
						}
						moveHere={
							this.props.map[coords] ? () => this.moveHere(coords) : null
						}
					/>
				);
			}
			rows.push(<Row key={i}>{row}</Row>);
		}
		return rows;
	};

	getNeighbor = (coords, direction) => {
		let [x, y] = coords.slice(1, -1).split(',');
		// Turn the strings into numbers to prevent Bad Things from happening
		x = +x;
		y = +y;

		const neighbor = {
			n: `(${x},${y + 1})`,
			s: `(${x},${y - 1})`,
			e: `(${x + 1},${y})`,
			w: `(${x - 1},${y})`
		};

		return neighbor[direction];
	};

	anticompass = direction => {
		const swap = { n: 's', s: 'n', e: 'w', w: 'e' };

		return swap[direction];
	};

	moveHere = target => {
		let coords = this.props.currentRoom.coordinates;
		let move = [];

		// Breadth first search for shortest path to room
		let visited = new Set();
		// Just trust me on this one
		let queue = [[[null, coords]]];

		while (!move.length && queue.length && queue.length < 500) {
			console.log('Paths in queue:', queue.length);
			console.log('Rooms seen:', visited.size);

			// Dequeue a path
			let path = queue.shift();

			console.log('path', path);

			// Get the last room in the path
			const roomCoords = path[path.length - 1][1];
			const room = this.props.map[roomCoords];
			console.log('room', room);

			//
			for (let exit in room.exits) {
				const neighborCoords = this.getNeighbor(roomCoords, exit);
				// console.log('neighborCoords', neighborCoords);

				// Have we seen this room before? (during this search)
				if (!visited.has(neighborCoords)) {
					visited.add(neighborCoords);

					// Have we discovered this room?
					if (neighborCoords === target) {
						// Next path found. Ready to exit search.
						move = [...path.slice(1), [exit, neighborCoords]];
					} else {
						// Add the updated path to the queue
						queue.push([...path, [exit, neighborCoords]]);
					}
				}
				// Exit search
				if (move.length) break;
			}
		}

		if (move.length) {
			console.log('Next path:', move[0]);

			this.props.updatePath(move, this.lsPath);
		}
	};

	// Update localStorage path
	lsPath = () => {
		localStorage.setItem('path', JSON.stringify(this.props.path));
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
						? `${this.props.currentRoom.room_id} ${
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
	{ updatePath }
)(Map);
