import {
	MOVE,
	TAKE_TREASURE,
	DROP_TREASURE,
	SELL_TREASURE,
	CONFIRM_SALE,
	CHECK_STATUS
} from '../actions';

const initialState = {
	currentRoom: {}
};

const mapReducer = (state = initialState, action) => {
	switch (action.type) {
		// move
		case MOVE:
			return { ...state, currentRoom: action.payload };

		default:
			return state;
	}
};

export default mapReducer;
