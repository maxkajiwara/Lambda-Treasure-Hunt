// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import {
	initialize,
	checkStatus,
	move,
	updateMap,
	updatePath
} from '../../actions';

import styled from 'styled-components';

const ControlsContainer = styled.div`
	margin-bottom: 50px;
`;

const Cooldown = styled.h1`
	display: flex;
	justify-content: center;
	font-size: 2.4rem;
	margin-bottom: 20px;
`;

const Movement = styled.div`
	margin-bottom: 25px;
`;

const Actions = styled.div``;

const Button = styled.button``;

class Controls extends Component {
	state = {
		timer: null,
		cooldown: 0,
		autoDiscover: false
	};

	tick = () => {
		this.setState({
			cooldown: this.state.cooldown - 1
		});

		// If cooldown has expired and not we're not awaiting a response:
		if (this.state.cooldown <= 0 && !this.props.busy) {
			// If there's a path to follow:
			if (this.props.path.length) {
				// Move to the next room.
				this.move(this.props.path[0]);
			}

			// // If autoDiscover is enabled:
			else if (
				this.state.autoDiscover &&
				this.props.currentRoom.room_id !== undefined
			) {
				// Trigger autoDiscover.
				this.autoDiscover();
			}
		}
	};

	getNeighbor = (coords, direction) => {
		const [x, y] = coords.slice(1, -2).split(',');
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

	cdReset = cooldown => {
		// Reset the cooldown timer
		this.setState({
			cooldown: cooldown || this.props.cooldown
		});

		// If autoDiscover is enabled:
		if (this.state.autoDiscover && this.props.currentRoom.room_id) {
			// Trigger autoDiscover.
			this.autoDiscover();
		}
	};

	move = ([direction, prediction]) => {
		this.props.move([direction, prediction], this.cdReset);
	};

	autoDiscover = () => {
		console.log('autoDiscover triggered');

		// Get coordinates.
		const coords = this.props.currentRoom.coordinates;

		console.log('coords:', this.props.currentRoom.coordinates);

		let move = [];

		// If we have not discovered this room before:
		if (!this.props.map[coords]) {
			// Get other info.
			const exits = this.props.currentRoom.exits;
			const roomID = this.props.currentRoom.room_id;

			// Update connections to known rooms.
			const localExits = {};
			let connections = [];

			exits.forEach(exit => {
				const neighbor = this.props.map[this.getNeighbor(coords, exit)];
				// If neighbor is known:
				if (neighbor) {
					// Assign a roomID to each shared exit.
					localExits[exit] = neighbor.roomID;
					connections.push({
						coords: this.getNeighbor(coords, exit),
						exit: this.anticompass(exit),
						roomID
					});
				} else {
					localExits[exit] = -1;
					if (!move.length) {
						move.push([exit]);
					}
				}
			});

			console.log("New room's exits:", localExits);

			// This is returning numbers for some reason - 0, 1, 2, 3
			// for (let exit in Object.keys(localExits)) {
			// 	if (localExits[exit] === -1) {
			// 		move = [[exit]];
			// 		break;
			// 	}
			// }

			// Ship it off to the reducer.
			this.props.updateMap({ coords, roomID, exits: localExits }, connections);
		}

		if (!move.length) {
			// Breadth first search for nearest room with unexplored exits
			let visited = new Set();
			// Just trust me on this one
			let queue = [[[null, coords]]];

			while (!move && queue.length) {
				// Dequeue a path
				let path = queue.shift();
				// Get the last room in the path so far
				let room = this.props.map[path[path.length - 1][1]];

				for (let exit in room.exits) {
					let neighbor = this.getNeighbor(room.coords, exit);

					if (!visited.has(neighbor)) {
						let new_path = [...path, [exit, neighbor]];

						for (let [key, value] in Object.entries(
							this.props.map[neighbor].exits
						)) {
							if (value === -1) {
								move = [...new_path, [key]];
								break;
							} else {
								queue.push(new_path);
							}
						}
					}

					if (move.length) break;
				}
			}
		}

		if (move.length) {
			console.log('Next move:', move[0]);

			this.props.updatePath(move);
		} else {
			this.setState({
				autoDiscover: false,
				message: 'All rooms discovered'
			});
		}
	};

	// localStorage.setItem('map', JSON.stringify(this.state.map)

	componentDidMount() {
		// Get info from localStorage
		const map = JSON.parse(localStorage.getItem('map'));
		const path = JSON.parse(localStorage.getItem('path'));

		// Send map & path to the store and get current room
		this.props.initialize(map, path);

		// Get status
		this.props.checkStatus();

		// get cooldown and timestamp of last action
		// const cooldown = JSON.parse(localStorage.getItem('cooldown'));
		// const traversal = JSON.parse(localStorage.getItem('traversal'));

		const timer = setInterval(this.tick, 1000);

		this.setState({
			timer
		});
	}

	componentWillUnmount() {
		this.clearInterval(this.state.timer);
		localStorage.setItem('cooldown', JSON.stringify(this.state.cooldown));
	}

	render() {
		return (
			<ControlsContainer>
				<Cooldown>
					{this.props.busy
						? 'Working...'
						: this.state.cooldown >= 0
						? `Cooldown: ${this.state.cooldown}s`
						: `Cooldown: ${-this.state.cooldown}s ago`}
				</Cooldown>
				<Movement>
					<Button
						onClick={() => {
							this.setState({ autoDiscover: !this.state.autoDiscover });
							console.log('autoDiscover', !this.state.autoDiscover);
						}}
					>
						Discover Rooms
					</Button>
					<Button>Collect Treasure</Button>
					<Button>Return to Shop</Button>
					<Button>Move to Room</Button>
				</Movement>

				<Actions>
					<Button>Auto Sell</Button>
					<Button>Set Max Encumbrance</Button>
					<Button onClick={this.props.checkStatus}>Update Status</Button>
					<Button>Choose a Name</Button>
				</Actions>
			</ControlsContainer>
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
	{ initialize, checkStatus, move, updateMap, updatePath }
)(Controls);
