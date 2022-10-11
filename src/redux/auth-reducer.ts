import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS'


/* export interface InitialStateType {
	id: number | null,
	email: string | null,
	login: string | null,
	isAuth: false,
	captchaUrl: string | null
} */

let initialState = {
	id: null as number | null,
	email: null as string | null,
	login: null as string | null,
	isAuth: false,
	captchaUrl: null as string | null

}

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
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


interface SetAuthDataType {
	id: number | null
	email: string | null
	login: string | null
	isAuth: boolean
}
interface SetAuthUserDataType {
	type: typeof SET_USER_DATA
	payload: SetAuthDataType
}

//Action creators
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataType => ({
	type: SET_USER_DATA, payload: { id, email, login, isAuth }
})

interface setCaptchaType {
	type: typeof GET_CAPTCHA_URL_SUCCESS
	payload: { captchaUrl: string }
}
export const setCaptchaUrl = (captchaUrl: string): setCaptchaType => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } })


//Thunks(санки)
export const getAuthUserData = () => async (dispatch: any) => {
	let response = await authAPI.authMe()

	if (response.data.resultCode === 0) {
		let { id, email, login } = response.data.data;
		dispatch(setAuthUserData(id, email, login, true));
	}
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
	let response = await authAPI.login(email, password, rememberMe, captcha)

	if (response.data.resultCode === 0) {
		dispatch(getAuthUserData())

	} else {
		if (response.data.resultCode === 10) {
			dispatch(getCaptchaUrl())
		}
		//Берется ошибка из response
		let message = response.data.messages.length > 0 ? response.data.messages[0] : "Something is wrong..."
		//_error - общая ошибка для всей формы
		//специальный action для остановки отправки формы
		dispatch(stopSubmit('login', { _error: message }))
	}
}

export const logout = () => async (dispatch: any) => {
	let response = await authAPI.logout()

	if (response.data.resultCode === 0) {
		dispatch(setAuthUserData(null, null, null, false))
	}
}


export const getCaptchaUrl = () => async (dispatch: any) => {
	const response = await securityAPI.getCaptchaUrl()
	const captcha = response.data.url

	dispatch(setCaptchaUrl(captcha))
}


export default authReducer;