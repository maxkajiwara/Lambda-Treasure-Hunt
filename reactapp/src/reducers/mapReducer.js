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
	cooldown: 0,
	busy: true
};

const mapReducer = (state = initialState, action) => {
	switch (action.type) {
		// initialize
		case INIT:
			return {
				...state,
				Initializing: true,
				busy: true
			};

		case INIT_SUCCESS:
			const { currentRoom, map, path } = action.payload;

			return {
				...state,
				Initializing: false,
				currentRoom,
				cooldown: currentRoom.cooldown,
				map: map || {},
				path: path || [],
				busy: false
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
				busy: true
			};

		case MOVE_SUCCESS:
			return {
				...state,
				moving: false,
				busy: false,
				currentRoom: action.payload,
				path: state.path.slice(1),
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
			console.log('connections:', connections);

			connections.forEach(c => {
				console.log('newMap[c.coords]:', newMap[c.coords]);
				console.log('newMap[c.coords].exits:', newMap[c.coords].exits);
				newMap = {
					...newMap,
					[c.coords]: {
						...newMap[c.coords],
						exits: { ...newMap[c.coords].exits, [c.exit]: c.roomID }
					}
				};
			});

			return {
				...state,
				map: { ...newMap, [coords]: { roomID, exits } }
			};

		// update path
		case UPDATE_PATH:
			// Convert coords to room ids
			const wisepath = action.payload.map(move => {
				if (!move[1]) {
					return move;
				} else {
					return [move[0], state.map[move[1]].roomID];
				}
			});

			return {
				...state,
				path: wisepath
			};

		default:
			return state;
	}
};

export default mapReducer;
