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


class UsersContainer extends React.Component {
	componentDidMount() {
		const { currentPage, pageSize } = this.props
		this.props.getUsers(currentPage, pageSize)
	}

	onPageChanged = (pageNumber) => {
		const { pageSize } = this.props
		this.props.setCurrentPage(pageNumber);
		this.props.getUsers(pageNumber, pageSize)
	}

	render() {

		return <>
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

let mapStateToProps = (state) => {
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
	connect(mapStateToProps,
		{ follow, unfollow, setCurrentPage, toggleFollowingProgress, getUsers }),
	withAuthRedirect
)(UsersContainer)





