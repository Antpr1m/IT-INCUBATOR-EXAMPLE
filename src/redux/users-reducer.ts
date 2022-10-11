import { usersAPI } from "../api/api";
import { UserType } from "../types/types";
import { updateObjectInArray } from "../utils/object-helpers/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {
	users: [] as Array<UserType>,  //уточнения для точного приведения к типу
	pageSize: 10,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: true,
	followingInProgress: [] as Array<number>   //array of users ids
}

type InitialStateType = typeof initialState //уточнение типа

const usersReducer = (state = initialState, action: any): InitialStateType => {

	switch (action.type) {
		case FOLLOW:
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
		case UNFOLLOW:
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
		case SET_USERS:
			return { ...state, users: action.users }
		case SET_CURRENT_PAGE:
			return { ...state, currentPage: action.currentPage }
		case SET_TOTAL_USERS_COUNT:
			return { ...state, totalUsersCount: action.totalCount }
		case TOGGLE_IS_FETCHING:
			return { ...state, isFetching: action.isFetching }
		case TOGGLE_IS_FOLLOWING_PROGRESS:
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

//Types for action creators
type FollowSuccessType = {
	type: typeof FOLLOW
	userId: number
}
type UnfollowSuccess = {
	type: typeof UNFOLLOW
	userId: number
}
type SetUsers = {
	type: typeof SET_USERS
	users: Array<UserType>
}
type SetCurrentPage = {
	type: typeof SET_CURRENT_PAGE
	currentPage: number
}
type SetUsersTotalCount = {
	type: typeof SET_TOTAL_USERS_COUNT
	totalCount: number
}
type ToggleIsFetching = {
	type: typeof TOGGLE_IS_FETCHING
	isFetching: boolean
}
type ToggleFollowingProgress = {
	type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
	isFetching: boolean
	userId: number
}

//Action creators
export const followSuccess = (userId: number): FollowSuccessType => ({ type: FOLLOW, userId })
export const unfollowSuccess = (userId: number): UnfollowSuccess => ({ type: UNFOLLOW, userId })
export const setUsers = (users: Array<UserType>): SetUsers => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage: number): SetCurrentPage => ({ type: SET_CURRENT_PAGE, currentPage })
export const setUsersTotalCount = (totalCount: number): SetUsersTotalCount => ({ type: SET_TOTAL_USERS_COUNT, totalCount })
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetching => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgress => ({
	type: TOGGLE_IS_FOLLOWING_PROGRESS,
	isFetching,
	userId
})

export const getUsers = (currentPage: number, pageSize: number) => {
	return async (dispatch: any) => {
		dispatch(toggleIsFetching(true));
		let response = await usersAPI.getUsers(currentPage, pageSize)

		dispatch(toggleIsFetching(false));
		dispatch(setUsers(response.data.items));
		dispatch(setUsersTotalCount(response.data.totalCount));
	}
}

export const unfollow = (userId: number) => {
	return async (dispatch: any) => {
		dispatch(toggleFollowingProgress(true, userId))
		let response = await usersAPI.unfollow(userId)
		if (response.data.resultCode === 0) {
			dispatch(unfollowSuccess(userId))
		}
		dispatch(toggleFollowingProgress(false, userId))
	}
}

export const follow = (userId: number) => {
	return async (dispatch: any) => {
		dispatch(toggleFollowingProgress(true, userId))
		let response = await usersAPI.follow(userId)
		if (response.data.resultCode === 0) {
			dispatch(followSuccess(userId))
		}
		dispatch(toggleFollowingProgress(false, userId))
	}
}
export default usersReducer;