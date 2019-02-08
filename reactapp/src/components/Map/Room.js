// Dependencies
import React from 'react';

import styled from 'styled-components';

const RoomContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 25px;
	height: 25px;
	background: ${props =>
		props.current
			? '#b52f2f'
			: props.path
			? '#b5a93f'
			: props.explored
			? 'gray'
			: '#1a1a1a'};
	font-size: 1.1rem;
	font-weight: bold;

	border-top: ${props =>
		props.explored && props.explored.n
			? props.explored.n === '?'
				? '1px solid red'
				: '1px solid gray'
			: '1px solid #1a1a1a'};

	border-bottom: ${props =>
		props.explored && props.explored.s
			? props.explored.s === '?'
				? '1px solid red'
				: '1px solid gray'
			: '1px solid #1a1a1a'};

	border-right: ${props =>
		props.explored && props.explored.e
			? props.explored.e === '?'
				? '1px solid red'
				: '1px solid gray'
			: '1px solid #1a1a1a'};

	border-left: ${props =>
		props.explored && props.explored.w
			? props.explored.w === '?'
				? '1px solid red'
				: '1px solid gray'
			: '1px solid #1a1a1a'};
`;

const Room = props => {
	return (
		<RoomContainer
			current={props.current}
			explored={props.info && props.info.exits}
			path={props.path}
			// title={props.info ? COORDS : NULL}
		>
			{props.info && `${props.info.roomID}`}
		</RoomContainer>
	);
};

export default Room;
