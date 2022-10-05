import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";
import { unhandleError } from "./app-reducer ";

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
	],
	profile: null,
	status: ""
}

const profileReducer = (state = initialState, action) => {

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
			return { ...state, profile: { ...state.profile, photos: action.photos } }
		default:
			return state;
	}
}

export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const addPostCreator = (newPostText) => ({ type: ADD_POST, newPostText })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const deletePost = (postId) => ({ type: DELETE_POST, payload: postId })
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, payload: photos })



export const getProfile = (userId) => async (dispatch) => {
	let response = await profileAPI.getProfile(userId)
	dispatch(setUserProfile(response.data));
}


export const getStatus = (userId) => async (dispatch) => {  //thunk с запросом статуса на сервер и его отправка в state
	let response = await profileAPI.getStatus(userId)
	dispatch(setStatus(response.data));

}


export const updateStatus = (status) => async (dispatch) => {  //Обновление статуса(отправка его на сервер) с его последующей отправкой(dispatch) в state
	try {
		let response = await profileAPI.updateStatus(status)

		if (response.data.resultCode === 0) {
			dispatch(setStatus(status));     //Отправка в state
		}
	} catch (error) {
		if (error.response.status === 403) {
			unhandleError(error.message)
		}

	}

}

export const savePhoto = (file) => async (dispatch) => {
	let response = await profileAPI.savePhoto(file)

	if (response.data.resultCode === 0) {
		dispatch(savePhotoSuccess(response.data.data.photos));     //Отправка в state
	}
}

//В этом thunk-creator берется из стейта auth id залог. пользователя и отдается в getProfile()
export const saveProfile = (profile) => async (dispatch, getState) => {
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