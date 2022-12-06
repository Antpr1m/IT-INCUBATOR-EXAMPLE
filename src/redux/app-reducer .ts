import { ThunkAction } from "redux-thunk";
import { getAuthUserData } from "./auth-reducer";
import { AppStateType, InferActionsTypes } from "./redux-store";

// При автоматическом выведении типа из action creators можно не создавать константы с типами 
//const SET_INITIALIZED = 'APP/SET_INITIALIZED';
// const SET_GLOBAL_ERROR = 'app/SET_GLOBAL_ERROR';



let initialState = {
	initialized: false
}

type InitialStateType = typeof initialState

//Автоматическое выведение типов из action creators
type ActionsType = InferActionsTypes<typeof actions>

//Функция возвращает InitialStateType
const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'APP/SET_INITIALIZED':
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



export const actions = {
	initializingSuccess: () => ({ type: 'APP/SET_INITIALIZED' } as const)
}



//Thunks(санки)
export const initializeApp = () => (dispatch: any) => {
	let promise = dispatch(getAuthUserData())
	Promise.all([promise])
		.then(() => {
			dispatch(actions.initializingSuccess)
		})
}

/* export const unhandleError = (globalError) => (dispatch) => {
	dispatch(setGlobalError(globalError))
	setTimeout(() => {
		dispatch(setGlobalError(null))
	}, 5000)
} */



export default appReducer;