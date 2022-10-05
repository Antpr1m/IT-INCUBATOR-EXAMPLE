import * as axios from "axios";

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		"API-KEY": "43c501a1-c980-4a6c-84ec-29688ec1c4cd"
	}
});

export const usersAPI = {
	getUsers(currentPage = 1, pageSize = 10) {
		return instance.get(`users?page=${currentPage}&count=${pageSize}`)
	},
	follow(userId) {
		return instance.post(`follow/${userId}`, {})
	},
	unfollow(userId) {
		return instance.delete(`follow/${userId}`)
	},
	getProfile(userId) {
		console.warn('obsolete method. Please use profileAPI')
		return profileAPI.getProfile(userId)

	}
}

export const profileAPI = {
	getProfile(userId) {
		return instance.get(`profile/` + userId)
	},
	getStatus(userId) {
		return instance.get(`profile/status/` + userId)
	},
	updateStatus(status) {
		return instance.put(`profile/status/`, { status: status });
	},
	savePhoto(photoFile) {
		const formData = new FormData()			//Для отправки файла(не json)
		formData.append("image", photoFile)
		return instance.put(`profile/photo/`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	},
	saveProfile(profile) {
		return instance.put(`profile`, profile)
	}
}

export const authAPI = {
	authMe() {
		return instance.get('auth/me')
	},
	login(email, password, rememberMe = false, captcha) {
		return instance.post('auth/login', { email, password, rememberMe, captcha })
	},
	logout() {
		return instance.delete('auth/login')
	}
}

export const securityAPI = {
	getCaptchaUrl() {
		return instance.get('security/get-captcha-url')
	}
}

