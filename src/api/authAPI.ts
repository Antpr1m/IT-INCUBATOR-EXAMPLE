import { instance, ResponseType } from "./api";




export type AuthMeResponseType = {
	id: number, email: string, login: string
	// resultCode: ResultCodesEnum
	// messages: Array<string>
}
export type LoginResponseType = {
	userId: number
	// resultCode: ResultCodesEnum
	// messages: Array<string>
}


export const authAPI = {
	authMe() {
		return instance.get<ResponseType<AuthMeResponseType>>('auth/me')
	},
	login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
		return instance.post<ResponseType<LoginResponseType>>('auth/login', { email, password, rememberMe, captcha });
	},
	logout() {
		return instance.delete('auth/login');
	}
};

