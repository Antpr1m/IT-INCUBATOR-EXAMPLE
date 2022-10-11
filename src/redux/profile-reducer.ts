import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";
import { PhotosType, PostType, ProfileType } from "../types/types";
// import { unhandleError } from "./app-reducer ";

const ADD_POST = 'profilePage/ADD-POST';
const SET_USER_PROFILE = 'profilePage/SET_USER_PROFILE';
const SET_STATUS = 'profilePage/SET_STATUS';
const DELETE_POST = 'profilePage/DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'profilePage/SAVE_PHOTO_SUCCESST'



let initialState = {
	posts: [
		{ id: 1, message: 'Hi! How are you?', likesCount: 11 },
		{ id: 2, message: "It's my first post", likesCount: 12 },
		{ id: 3, message: "I'm Lenochka-beauty kitty", likesCount: 88 },
	] as Array<PostType>,
	profile: null as ProfileType | null,
	status: "",
	newPostText: ''
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {

	switch (action.type) {
		case ADD_POST:
			let newPost = {
				id: 4,
				message: action.newPostText,
				likesCount: 0
			};
			return {
				...state,
				posts: [...state.posts, newPost],
				newPostText: ''
			}
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(p => p.id !== action.payload)
			}
		case SET_USER_PROFILE:
			return { ...state, profile: action.profile }
		case SET_STATUS:
			return { ...state, status: action.status }
		case SAVE_PHOTO_SUCCESS:
			return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType }
		default:
			return state;
	}
}

//Типизация для action creators  
type SetUserProfileType = {
	type: typeof SET_USER_PROFILE
	profile: ProfileType
}
type AddPostCreatorType = {
	type: typeof ADD_POST
	newPostText: string
}
type SetStatusType = {
	type: typeof SET_STATUS
	status: string
}
type DeletePostType = {
	type: typeof DELETE_POST
	payload: number
}
type SavePhotoSuccessType = {
	type: typeof SAVE_PHOTO_SUCCESS
	payload: PhotosType
}

//Action creators
export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({ type: SET_USER_PROFILE, profile })
export const addPostCreator = (newPostText: string): AddPostCreatorType => ({ type: ADD_POST, newPostText })
export const setStatus = (status: string): SetStatusType => ({ type: SET_STATUS, status })
export const deletePost = (postId: number): DeletePostType => ({ type: DELETE_POST, payload: postId })
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => ({ type: SAVE_PHOTO_SUCCESS, payload: photos })


//Thunk creators
export const getProfile = (userId: number) => async (dispatch: any) => {
	let response = await profileAPI.getProfile(userId)
	dispatch(setUserProfile(response.data));
}


export const getStatus = (userId: number) => async (dispatch: any) => {  //thunk с запросом статуса на сервер и его отправка в state
	let response = await profileAPI.getStatus(userId)
	dispatch(setStatus(response.data));

}


export const updateStatus = (status: string) => async (dispatch: any) => {  //Обновление статуса(отправка его на сервер) с его последующей отправкой(dispatch) в state
	try {
		let response = await profileAPI.updateStatus(status)

		if (response.data.resultCode === 0) {
			dispatch(setStatus(status));     //Отправка в state
		}
	} catch (error) {

	}

}

export const savePhoto = (file: any) => async (dispatch: any) => {
	let response = await profileAPI.savePhoto(file)

	if (response.data.resultCode === 0) {
		dispatch(savePhotoSuccess(response.data.data.photos));     //Отправка в state
	}
}

//В этом thunk-creator берется из стейта auth id залог. пользователя и отдается в getProfile()
export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
	const userId = getState().auth.id
	let response = await profileAPI.saveProfile(profile)
	if (response.data.resultCode === 0) {
		dispatch(getProfile(userId));     //Отправка в state
	} else {
		dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }))			//Ошибка попадет в reduxForm под словом error
		//в случае ошибки
		return Promise.reject(response.data.messages[0])
		//ошибка для конкретного поля
		//dispatch(stopSubmit("edit-profile", { 'contacts': { 'facebook': response.data.messages[0] } }))
	}
}


export default profileReducer;