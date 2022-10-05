import style from "./Users.module.css";
import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";


const Users = ({ currentPage, totalItemsCount, pageSize, onPageChanged, users, ...props }) => {

	return (
		<div className={style.usersContainer}>
			<div className={style.usersPaginator}>
				<Paginator currentPage={currentPage} totalItemsCount={totalItemsCount} pageSize={pageSize} onPageChanged={onPageChanged} />
			</div>
			{
				users.map(u => <User user={u} key={u.id}
					followingInProgress={props.followingInProgress}
					follow={props.follow}
					unfollow={props.unfollow}
				/>
				)
			}
		</div>
	)
}

export default Users;