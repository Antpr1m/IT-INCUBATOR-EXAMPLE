import { getAuthUserData } from "./auth-reducer";

const SET_INITIALIZED = 'app/SET_INITIALIZED';
// const SET_GLOBAL_ERROR = 'app/SET_GLOBAL_ERROR';


export interface InitialStateType {
	initialized: boolean
}


let initialState: InitialStateType = {
	initialized: false
}

//Функция возвращает InitialStateType
const appReducer = (state = initialState, action: any): InitialStateType => {
	switch (action.type) {
		case SET_INITIALIZED:
			return {
				...state,
				initialized: true
			}
		/* 		case SET_GLOBAL_ERROR:
					return { ...state, globalError: action.payload } */
		default:
			return state;
	}
}

//Types for actions
interface InitializedSuccessActionType {
	type: typeof SET_INITIALIZED
}

export const initializingSuccess = (): InitializedSuccessActionType => ({ type: SET_INITIALIZED })
// export const setGlobalError = (globalError) => ({ type: SET_GLOBAL_ERROR, payload: globalError })


//Thunks(санки)
export const initializeApp = () => (dispatch: any) => {
	let promise = dispatch(getAuthUserData)
	Promise.all([promise])
		.then(() => {
			dispatch(initializingSuccess)
		})
}

/* export const unhandleError = (globalError) => (dispatch) => {
	dispatch(setGlobalError(globalError))
	setTimeout(() => {
		dispatch(setGlobalError(null))
	}, 5000)
} */



export default appReducer;