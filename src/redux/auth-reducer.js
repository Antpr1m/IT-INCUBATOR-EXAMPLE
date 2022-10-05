import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS'


let initialState = {
	id: null,
	email: null,
	login: null,
	isAuth: false,
	captchaUrl: null

}
const authReducer = (state = initialState, action) => {
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


export const setAuthUserData = (id, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { id, email, login, isAuth } })
export const setCaptchaUrl = (captchaUrl) => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } })


//Thunks(санки)
export const getAuthUserData = () => async (dispatch) => {
	let response = await authAPI.authMe()

	if (response.data.resultCode === 0) {
		let { id, email, login } = response.data.data;
		dispatch(setAuthUserData(id, email, login, true));
	}
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
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

export const logout = () => async (dispatch) => {
	let response = await authAPI.logout()

	if (response.data.resultCode === 0) {
		dispatch(setAuthUserData(null, null, null, false))
	}
}


export const getCaptchaUrl = () => async (dispatch) => {
	const response = await securityAPI.getCaptchaUrl()
	const captcha = response.data.url

	dispatch(setCaptchaUrl(captcha))
}


export default authReducer;