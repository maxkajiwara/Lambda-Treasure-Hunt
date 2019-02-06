import {
	MOVE,
	TAKE_TREASURE,
	DROP_TREASURE,
	SELL_TREASURE,
	CONFIRM_SALE,
	CHECK_STATUS,
	CHECK_STATUS_SUCCESS,
	CHECK_STATUS_ERROR
} from '../actions';

const initialState = {
	map: {},
	currentRoom: {},
	previousAction: 0
};

const mapReducer = (state = initialState, action) => {
	switch (action.type) {
		// move
		case MOVE:
			return { ...state, currentRoom: action.payload };

		case CHECK_STATUS:
			return {
				...state,
				gettingStatus: true
			};

		case CHECK_STATUS_SUCCESS:
			return {
				...state,
				gettingStatus: false,
				status: action.payload
			};

		case CHECK_STATUS_ERROR:
			return {
				...state,
				gettingStatus: false,
				checkStatusError: `${action.payload}`
			};

		default:
			return state;
	}
};

export default mapReducer;
