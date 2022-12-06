import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { usersAPI } from "../api/usersAPI";
import { UserType } from "../types/types";
import { updateObjectInArray } from "../utils/object-helpers/object-helpers";
import { AppStateType, InferActionsTypes } from "./redux-store";



let initialState = {
	users: [] as Array<UserType>,  //уточнения для точного приведения к типу
	pageSize: 10,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: true,
	followingInProgress: [] as Array<number>   //array of users ids
}

type InitialStateType = typeof initialState //уточнение типа

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {

	switch (action.type) {
		case "FOLLOW":
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
				/* users: state.users.map(u => {
					if (u.id === action.userId) {
						return { ...u, followed: true }
					}
					return u;
				}) */
			}
		case 'UNFOLLOW':
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
				/* users: state.users.map(u => {
					if (u.id === action.userId) {
						return { ...u, followed: false }
					}
					return u;
				}) */
			}
		case 'SET_USERS':
			return { ...state, users: action.users }
		case 'SET_CURRENT_PAGE':
			return { ...state, currentPage: action.currentPage }
		case 'SET_TOTAL_USERS_COUNT':
			return { ...state, totalUsersCount: action.totalCount }
		case "TOGGLE_IS_FETCHING":
			return { ...state, isFetching: action.isFetching }
		case "TOGGLE_IS_FOLLOWING_PROGRESS":
			return {
				...state,
				followingInProgress: action.isFetching
					? [...state.followingInProgress, action.userId]
					: state.followingInProgress.filter(id => id !== action.userId)
			}
		default:
			return state;
	}
}


// Выделение типов из action creators
//Type for all actions
type ActionsType = InferActionsTypes<typeof actions>

//Выделить их в отдельный объект
export const actions = {
	//Action creators
	followSuccess: (userId: number) => ({ type: 'FOLLOW', userId } as const),  //добавить и воспринимать объекты как константы
	unfollowSuccess: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
	setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),
	setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
	setUsersTotalCount: (totalCount: number) => ({ type: 'SET_TOTAL_USERS_COUNT', totalCount } as const),
	toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
	toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
		type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
		isFetching,
		userId
	} as const)
}


// Thunk type
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

//Thunks
export const getUsers = (currentPage: number, pageSize: number) => {
	//Typing thunk, 1 вариант
	return async (dispatch: Dispatch<ActionsType>, getState: () => AppStateType) => {
		dispatch(actions.toggleIsFetching(true));
		let response = await usersAPI.getUsers(currentPage, pageSize)

		dispatch(actions.toggleIsFetching(false));
		dispatch(actions.setUsers(response.data.items));
		dispatch(actions.setUsersTotalCount(response.data.totalCount));
	}
}

//Typing thunk, 2 вариант
export const unfollow = (userId: number): ThunkAction<Promise<void>, AppStateType, unknown, ActionsType> => {
	return async (dispatch) => {
		dispatch(actions.toggleFollowingProgress(true, userId))
		let response = await usersAPI.unfollow(userId)
		if (response.data.resultCode === 0) {
			dispatch(actions.unfollowSuccess(userId))
		}
		dispatch(actions.toggleFollowingProgress(false, userId))
	}
}

export const follow = (userId: number): ThunkType => {
	return async (dispatch) => {
		dispatch(actions.toggleFollowingProgress(true, userId))
		let response = await usersAPI.follow(userId)
		if (response.data.resultCode === 0) {
			dispatch(actions.followSuccess(userId))
		}
		dispatch(actions.toggleFollowingProgress(false, userId))
	}
}
export default usersReducer;