import axios from 'axios';

axios.defaults.headers.common['Authorization'] = `Token ${
	process.env.REACT_APP_TOKEN
}`;

// initialize
export const INIT = 'INIT';
export const INIT_SUCCESS = 'INIT_SUCCESS';
export const INIT_ERROR = 'INIT_ERROR';
// move
export const MOVE = 'MOVE';
export const MOVE_SUCCESS = 'MOVE_SUCCESS';
export const MOVE_ERROR = 'MOVE_ERROR';
// take treasure
export const TAKE_TREASURE = 'TAKE_TREASURE';
export const TAKE_TREASURE_SUCCESS = 'TAKE_TREASURE_SUCCESS';
export const TAKE_TREASURE_ERROR = 'TAKE_TREASURE_ERROR';
// drop treasure
export const DROP_TREASURE = 'DROP_TREASURE';
export const DROP_TREASURE_SUCCESS = 'DROP_TREASURE_SUCCESS';
export const DROP_TREASURE_ERROR = 'DROP_TREASURE_ERROR';
// sell treasure
export const SELL_TREASURE = 'SELL_TREASURE';
export const SELL_TREASURE_SUCCESS = 'SELL_TREASURE_SUCCESS';
export const SELL_TREASURE_ERROR = 'SELL_TREASURE_ERROR';
// confirm sale
export const CONFIRM_SALE = 'CONFIRM_SALE';
export const CONFIRM_SALE_SUCCESS = 'CONFIRM_SALE_SUCCESS';
export const CONFIRM_SALE_ERROR = 'CONFIRM_SALE_ERROR';
// check status
export const CHECK_STATUS = 'CHECK_STATUS';
export const CHECK_STATUS_SUCCESS = 'CHECK_STATUS_SUCCESS';
export const CHECK_STATUS_ERROR = 'CHECK_STATUS_ERROR';
// update map
export const UPDATE_MAP = 'UPDATE_MAP';
// update path
export const UPDATE_PATH = 'UPDATE_PATH';

// Test loading messages
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export const initialize = (map, path) => {
	return dispatch => {
		dispatch({ type: INIT });

		axios
			.get('https://lambda-treasure-hunt.herokuapp.com/api/adv/init/')

			.then(async ({ data }) => {
				await sleep(1000);
				dispatch({
					type: INIT_SUCCESS,
					payload: { currentRoom: data, map, path }
				});
			})

			.catch(error => dispatch({ type: INIT_ERROR, payload: error }));
	};
};

export const checkStatus = () => {
	return dispatch => {
		dispatch({ type: CHECK_STATUS });

		axios
			.post('https://lambda-treasure-hunt.herokuapp.com/api/adv/status/')

			.then(async ({ data }) => {
				await sleep(1000);
				dispatch({ type: CHECK_STATUS_SUCCESS, payload: data });
			})

			.catch(error => dispatch({ type: CHECK_STATUS_ERROR, payload: error }));
	};
};

export const move = ([direction, prediction], callback) => {
	return dispatch => {
		dispatch({ type: MOVE });

		axios
			.post('https://lambda-treasure-hunt.herokuapp.com/api/adv/move/', {
				direction,
				prediction
			})

			.then(async ({ data }) => {
				await sleep(1000);
				dispatch({ type: MOVE_SUCCESS, payload: data });
				callback(data.cooldown);
			})

			.catch(error => dispatch({ type: MOVE_ERROR, payload: error }));
	};
};

export const takeTreasure = name => {
	return dispatch => {
		dispatch({ type: TAKE_TREASURE });

		axios
			.post('https://lambda-treasure-hunt.herokuapp.com/api/adv/take/', {
				name
			})

			.then(async ({ data }) => {
				await sleep(1000);
				dispatch({ type: TAKE_TREASURE_SUCCESS, payload: data });
			})

			.catch(error => dispatch({ type: TAKE_TREASURE_ERROR, payload: error }));
	};
};

export const dropTreasure = name => {
	return dispatch => {
		dispatch({ type: DROP_TREASURE });

		axios
			.post('https://lambda-treasure-hunt.herokuapp.com/api/adv/drop/', {
				name
			})

			.then(async ({ data }) => {
				await sleep(1000);
				dispatch({ type: DROP_TREASURE_SUCCESS, payload: data });
			})

			.catch(error => dispatch({ type: DROP_TREASURE_ERROR, payload: error }));
	};
};

export const sellTreasure = name => {
	return dispatch => {
		dispatch({ type: SELL_TREASURE });

		axios
			.post('https://lambda-treasure-hunt.herokuapp.com/api/adv/sell/', {
				name
			})

			.then(async ({ data }) => {
				await sleep(1000);
				dispatch({ type: SELL_TREASURE_SUCCESS, payload: data });
			})

			.catch(error => dispatch({ type: SELL_TREASURE_ERROR, payload: error }));
	};
};

export const confirmSale = name => {
	return dispatch => {
		dispatch({ type: CONFIRM_SALE });

		axios
			.post('https://lambda-treasure-hunt.herokuapp.com/api/adv/sell/', {
				name,
				confirm: 'no'
			})

			.then(async ({ data }) => {
				await sleep(1000);
				dispatch({ type: CONFIRM_SALE_SUCCESS, payload: data });
			})

			.catch(error => dispatch({ type: CONFIRM_SALE_ERROR, payload: error }));
	};
};

export const updateMap = (newRoom, connections) => {
	return dispatch => {
		dispatch({
			type: UPDATE_MAP,
			payload: { newRoom, connections }
		});
	};
};

export const updatePath = path => {
	return dispatch => {
		dispatch({
			type: UPDATE_PATH,
			payload: path
		});
	};
};
