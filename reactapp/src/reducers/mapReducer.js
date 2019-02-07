import {
	INIT,
	INIT_SUCCESS,
	INIT_ERROR,
	MOVE,
	MOVE_SUCCESS,
	MOVE_ERROR,
	TAKE_TREASURE,
	DROP_TREASURE,
	SELL_TREASURE,
	CONFIRM_SALE,
	CHECK_STATUS,
	CHECK_STATUS_SUCCESS,
	CHECK_STATUS_ERROR,
	UPDATE_MAP,
	UPDATE_PATH
} from '../actions';

const initialState = {
	map: {},
	path: [],
	currentRoom: {},
	cooldown: 0
};

const mapReducer = (state = initialState, action) => {
	switch (action.type) {
		// initialize
		case INIT:
			return {
				...state,
				Initializing: true
			};

		case INIT_SUCCESS:
			return {
				...state,
				Initializing: false,
				currentRoom: action.payload,
				cooldown: action.payload.cooldown,
				map: action.map || {},
				path: action.path || []
			};

		case INIT_ERROR:
			return {
				...state,
				Initializing: false,
				InitError: `${action.payload}`
			};

		// move
		case MOVE:
			return {
				...state,
				moving: true,
				currentRoom: action.payload
			};

		case MOVE_SUCCESS:
			return {
				...state,
				moving: false,
				currentRoom: action.payload,
				cooldown: action.payload.cooldown
			};

		case MOVE_ERROR:
			return {
				...state,
				moving: false,
				checkStatusError: `${action.payload}`
			};

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
			const { newRoom, connections } = action.payload;
			const { coords, roomID, exits } = newRoom;

			let newMap = { ...state.map };

			for (let c in connections) {
				newMap = {
					...newMap,
					[c.coords]: {
						...newMap[c.coords],
						exits: { ...newMap[c.coords].exits, [c.exit]: c.roomID }
					}
				};
			}

			return {
				...state,
				map: { ...newMap, [coords]: { roomID, exits } }
			};

		// check status
		case UPDATE_PATH:
			return {
				...state,
				path: action.payload
			};

		default:
			return state;
	}
};

export default mapReducer;
