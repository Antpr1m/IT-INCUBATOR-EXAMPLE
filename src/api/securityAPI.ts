import { instance } from "./api";


type GetCapthaUrlResponseType = {
	url: string
}

export const securityAPI = {
	getCaptchaUrl() {
		return instance.get<GetCapthaUrlResponseType>('security/get-captcha-url');
	}
};
