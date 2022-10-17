import { connect } from "react-redux";
import {
	follow,
	setCurrentPage,
	unfollow,
	toggleFollowingProgress, getUsers
} from "../../redux/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../common/preloader/Preloader";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { UserType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
	currentPage: number
	pageSize: number
	isFetching: boolean
	totalItemsCount: number
	users: Array<UserType>
	followingInProgress: Array<number>
}

type MapDispatchPropsType = {
	getUsers: (currentPage: number, pageSize: number) => void
	setCurrentPage: (pageNumber: number) => void
	follow: (userID: number) => void
	unfollow: (userID: number) => void
}

type OwnPropsType = {
	pageTitle: string
}

//Props состоят из трех частей
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
	componentDidMount() {
		const { currentPage, pageSize } = this.props
		this.props.getUsers(currentPage, pageSize)
	}

	onPageChanged = (pageNumber: number) => {
		const { pageSize } = this.props
		this.props.setCurrentPage(pageNumber);
		this.props.getUsers(pageNumber, pageSize)
	}

	render() {

		return <>
			<h1>{this.props.pageTitle}</h1>
			{this.props.isFetching ? <Preloader /> : null}
			<Users totalItemsCount={this.props.totalItemsCount}
				pageSize={this.props.pageSize}
				currentPage={this.props.currentPage}
				onPageChanged={this.onPageChanged}
				users={this.props.users}
				follow={this.props.follow}
				unfollow={this.props.unfollow}
				followingInProgress={this.props.followingInProgress} />
		</>
	}
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
	return {
		users: state.usersPage.users,
		pageSize: state.usersPage.pageSize,
		totalItemsCount: state.usersPage.totalUsersCount,
		currentPage: state.usersPage.currentPage,
		isFetching: state.usersPage.isFetching,
		followingInProgress: state.usersPage.followingInProgress
	}
}

//1 способ
//доступ к isAuth и HOC for redirect
/*let authRedirectComponent = withAuthRedirect(UsersContainer)
export default connect(mapStateToProps,
	 {follow, unfollow, setCurrentPage, toggleFollowingProgress, getUsers})(authRedirectComponent)*/

export default compose(
	connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps,
		{ follow, unfollow, setCurrentPage, getUsers }),
	// withAuthRedirect
)(UsersContainer)





