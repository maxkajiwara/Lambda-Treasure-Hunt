// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { checkStatus } from '../../actions';

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
		map: {},
		currentRoom: {},
		stack: [],
		traversal: [],
		timer: null,
		counter: 5
	};

	tick = () => {
		this.setState({
			counter: this.state.counter - 1
		});
	};

	// begin depth first traversal script
	autoDiscover = currentRoom_id => {
		const anticompass = { n: 's', s: 'n', e: 'w', w: 'e' };

		while (this.counter === 0) {
			console.log('autoDiscover triggered');
		}
	};

	// localStorage.setItem('map', JSON.stringify(this.state.map)

	componentDidMount() {
		const map = JSON.parse(localStorage.getItem('map'));
		const currentRoom = JSON.parse(localStorage.getItem('currentRoom'));
		const stack = JSON.parse(localStorage.getItem('stack'));
		const traversal = JSON.parse(localStorage.getItem('stack'));
		const previousAction = JSON.parse(localStorage.getItem('previousAction'));

		const timer = setInterval(this.tick, 1000);

		this.setState({
			map,
			currentRoom,
			stack,
			traversal,
			previousAction,
			timer
		});
	}

	componentWillUnmount() {
		this.clearInterval(this.state.timer);
	}

	render() {
		return (
			<ControlsContainer>
				<Cooldown>
					{this.state.counter >= 0
						? `Cooldown: ${this.state.counter}s`
						: `Cooldown: ${-this.state.counter}s ago`}
				</Cooldown>
				<Movement>
					<Button
						onClick={() => this.autoDiscover(this.props.currentRoom.room_id)}
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
	currentRoom: state.mapReducer.currentRoom
});

export default connect(
	mapStateToProps,
	{ checkStatus }
)(Controls);
