import {
	INIT,
	INIT_SUCCESS,
	INIT_ERROR,
	MOVE,
	TAKE_TREASURE,
	DROP_TREASURE,
	SELL_TREASURE,
	CONFIRM_SALE,
	CHECK_STATUS,
	CHECK_STATUS_SUCCESS,
	CHECK_STATUS_ERROR,
	UPDATE_MAP
} from '../actions';

const initialState = {
	map: [],
	currentRoom: {},
	previousAction: 0
};

const mapReducer = (state = initialState, action) => {
	switch (action.type) {
		// initialize
		case INIT:
			return {
				...state,
				gettingStatus: true
			};

		case INIT_SUCCESS:
			return {
				...state,
				gettingStatus: false,
				status: action.payload
			};

		case INIT_ERROR:
			return {
				...state,
				gettingStatus: false,
				checkStatusError: `${action.payload}`
			};

		// move
		case MOVE:
			return { ...state, currentRoom: action.payload };

		// check status
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

		// update map
		case UPDATE_MAP:
			const { newRoom, connections, autoDiscover } = action.payload;
			const { x, y, roomID, exits } = newRoom;

			// please work
			newMap = Object.assign([...state.map], {
				[x]: Object.assign([...state.map[x]], { [y]: { roomID, exits } })
			});

			// please work
			for (let c in connections) {
				newMap[c.x][c.y].exits[c.exit] = roomID;
			}

			return {
				...state,
				map: newMap
			};

		default:
			return state;
	}
};

export default mapReducer;
