// Dependencies
import React from 'react';

import styled from 'styled-components';

const RoomContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 30px;
	height: 30px;
	background: gray;
	border: 1px solid lightgray;
`;

const Room = props => {
	return (
		<RoomContainer>{props.info ? `${props.info.roomID}` : `-`}</RoomContainer>
	);
};

export default Room;
