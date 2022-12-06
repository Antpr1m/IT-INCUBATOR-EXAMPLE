export interface PostType {
	id: number
	message: string
	likesCount: number
}

export interface ContactsType {
	github: string
	vk: string
	facebook: string
	instagramm: string
	twitter: string
	website: string
	youtube: string
	mainLink: string
}

export interface PhotosType {
	small: string | null
	large: string | null
}

export type ProfileType = {
	userId: number
	lookingForAJob: boolean
	lookingForAJobDescription: string
	fullName: string
	contacts: ContactsType
	photos: PhotosType
}

export interface UserType {
	id: number
	name: string
	status: string
	photos: PhotosType,
	followed: boolean
}

export enum ResultCodesEnum {
	Success = 0,
	Error = 1,
	captchaIsRequired = 10
}

//API types
