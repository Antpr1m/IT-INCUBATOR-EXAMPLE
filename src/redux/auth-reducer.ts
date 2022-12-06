import { stopSubmit } from "redux-form";
import { securityAPI } from "../api/securityAPI";
import { authAPI } from "../api/authAPI";
import { ResultCodesEnum } from "../types/types";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS'

//All types in this file
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>			// Типизация action creators
type ThunkType = BaseThunkType<ActionsType>	// Thunk type


let initialState = {
	id: null as number | null,
	email: null as string | null,
	login: null as string | null,
	isAuth: false,
	captchaUrl: null as string | null

}


const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case SET_USER_DATA:
		case GET_CAPTCHA_URL_SUCCESS:
			return {
				...state,
				...action.payload
			}
		default:
			return state;
	}
}


//Object with actions
export const actions = {
	setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
		type: SET_USER_DATA, payload: { id, email, login, isAuth }
	} as const),
	setCaptchaUrl: (captchaUrl: string) => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } } as const)
}



//Thunks(санки)
export const getAuthUserData = (): ThunkType => async (dispatch) => {
	let response = await authAPI.authMe()

	if (response.data.resultCode === ResultCodesEnum.Success) {
		let { id, email, login } = response.data.data;
		dispatch(actions.setAuthUserData(id, email, login, true));
	}
}
// ?
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch: any) => {
	let response = await authAPI.login(email, password, rememberMe, captcha)

	if (response.data.resultCode === ResultCodesEnum.Success) {
		dispatch(getAuthUserData())

	} else {
		if (response.data.resultCode === ResultCodesEnum.captchaIsRequired) {
			dispatch(getCaptchaUrl())
		}
		//Берется ошибка из response
		let message = response.data.messages.length > 0 ? response.data.messages[0] : "Something is wrong..."
		//_error - общая ошибка для всей формы
		//специальный action для остановки отправки формы
		dispatch(stopSubmit('login', { _error: message }))
	}
}

export const logout = (): ThunkType => async (dispatch) => {
	let response = await authAPI.logout()

	if (response.data.resultCode === 0) {
		dispatch(actions.setAuthUserData(null, null, null, false))
	}
}


export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
	const response = await securityAPI.getCaptchaUrl()
	const captcha = response.data.url

	dispatch(actions.setCaptchaUrl(captcha))
}


export default authReducer;