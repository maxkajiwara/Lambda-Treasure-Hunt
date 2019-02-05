// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions

import styled from 'styled-components';

const ControlsContainer = styled.div`
	margin-bottom: 50px;
`;

const Movement = styled.div`
	margin-bottom: 25px;
`;

const Actions = styled.div``;

const Button = styled.button``;

class Controls extends Component {
	// begin depth first traversal script
	autoDiscover = () => {};

	render() {
		return (
			<ControlsContainer>
				<Movement>
					<Button onClick={this.autoDiscover}>Discover Rooms</Button>
					<Button>Collect Treasure</Button>
					<Button>Return to Shop</Button>
					<Button>Move to Room</Button>
				</Movement>

				<Actions>
					<Button>Auto Sell</Button>
					<Button>Set Max Encumbrance</Button>
					<Button>Update Status</Button>
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
	{}
)(Controls);
