// Dependencies
import React from 'react';

import styled from 'styled-components';

const RoomContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 30px;
	height: 30px;
	background: ${props =>
		props.current ? '#b52f2f' : props.explored ? 'gray' : '#1a1a1a'};
	font-size: 1.2rem;
	font-weight: bold;
	border: 1px solid #1a1a1a;
`;

const Room = props => {
	return (
		<RoomContainer
			current={props.current}
			explored={props.info ? props.info.exits : false}
		>
			{props.info ? `${props.info.roomID}` : null}
		</RoomContainer>
	);
};

export default Room;
