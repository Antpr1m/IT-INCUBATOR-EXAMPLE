import style from "./Users.module.css";
import React, { FC } from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import { UserType } from "../../types/types";


type PropsType = {
	currentPage: number
	totalItemsCount: number
	pageSize: number
	onPageChanged: (pageNumber: number) => void
	users: Array<UserType>
	followingInProgress: Array<number>
	follow: (userId: number) => void
	unfollow: (userId: number) => void
}

const Users: FC<PropsType> = ({ currentPage, totalItemsCount, pageSize, onPageChanged, users, ...props }) => {

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