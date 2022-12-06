import { FormAction, stopSubmit } from "redux-form";
import { profileAPI } from "../api/profileAPI";
import { PhotosType, PostType, ProfileType } from "../types/types";
import { BaseThunkType, InferActionsTypes } from "./redux-store";
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
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {

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
			return { ...state, profile: { ...state.profile, photos: action.payload } as ProfileType }
		default:
			return state;
	}
}


export const actions = {
	setUserProfile: (profile: ProfileType) => ({ type: SET_USER_PROFILE, profile } as const),
	addPostCreator: (newPostText: string) => ({ type: ADD_POST, newPostText } as const),
	setStatus: (status: string) => ({ type: SET_STATUS, status } as const),
	deletePost: (postId: number) => ({ type: DELETE_POST, payload: postId } as const),
	savePhotoSuccess: (photos: PhotosType) => ({ type: SAVE_PHOTO_SUCCESS, payload: photos } as const)
}



//Thunk creators
export const getProfile = (userId: number): ThunkType => async (dispatch) => {
	let response = await profileAPI.getProfile(userId)
	dispatch(actions.setUserProfile(response.data));
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {  //thunk с запросом статуса на сервер и его отправка в state
	let response = await profileAPI.getStatus(userId)
	dispatch(actions.setStatus(response.data));

}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {  //Обновление статуса(отправка его на сервер) с его последующей отправкой(dispatch) в state
	try {
		let response = await profileAPI.updateStatus(status)

		if (response.data.resultCode === 0) {
			dispatch(actions.setStatus(status));     //Отправка в state
		}
	} catch (error) {

	}
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
	let data = await profileAPI.savePhoto(file)

	if (data.resultCode === 0) {
		dispatch(actions.savePhotoSuccess(data.data.photos));     //Отправка в state
	}
}

//В этом thunk-creator берется из стейта auth id залог. пользователя и отдается в getProfile()
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
	const userId = getState().auth.id
	let response = await profileAPI.saveProfile(profile)
	if (response.data.resultCode === 0) {
		if (userId != null) {
			dispatch(getProfile(userId))    //Отправка в state
		}
	} else {
		dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }))			//Ошибка попадет в reduxForm под словом error
		//в случае ошибки
		return Promise.reject(response.data.messages[0])
		//ошибка для конкретного поля
		//dispatch(stopSubmit("edit-profile", { 'contacts': { 'facebook': response.data.messages[0] } }))
	}
}


export default profileReducer;