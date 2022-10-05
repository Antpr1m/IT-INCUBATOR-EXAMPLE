import { getAuthUserData } from "./auth-reducer";

const SET_INITIALIZED = 'app/SET_INITIALIZED';
const SET_GLOBAL_ERROR = 'app/SET_GLOBAL_ERROR';


let initialState = {
	initialized: false,
	globalError: ''
}

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_INITIALIZED:
			return {
				...state,
				initialized: true
			}
		case SET_GLOBAL_ERROR:
			return { ...state, globalError: action.payload }
		default:
			return state;
	}
}


export const initializingSuccess = () => ({ type: SET_INITIALIZED })
export const setGlobalError = (globalError) => ({ type: SET_GLOBAL_ERROR, payload: globalError })


//Thunks(санки)
export const initializeApp = () => (dispatch) => {
	let promise = dispatch(getAuthUserData)
	Promise.all([promise])
		.then(() => {
			dispatch(initializingSuccess)
		})
}

export const unhandleError = (globalError) => (dispatch) => {
	dispatch(setGlobalError(globalError))
	setTimeout(() => {
		dispatch(setGlobalError(null))
	}, 5000)
}



export default appReducer;