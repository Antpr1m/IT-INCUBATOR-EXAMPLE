import style from "./Users.module.css";
import userPhoto from "../../img/user.png";
import React from "react";
import { NavLink } from "react-router-dom";



const User = ({ user, followingInProgress, follow, unfollow }) => {

	return (
		<div className={style.usersBody}>
			<div>
				<div className={style.userImage}>
					<NavLink to={'/profile/' + user.id}>
						<img src={user.photos.small != null ? user.photos.small : userPhoto} alt='' />
					</NavLink>
				</div>
				<div>
					{user.followed
						? <button disabled={followingInProgress.some(id => id === user.id)}
							onClick={() => { unfollow(user.id) }}>
							Unfollow</button>
						: <button disabled={followingInProgress.some(id => id === user.id)}
							onClick={() => { follow(user.id) }}>
							Follow</button>}
				</div>
			</div>
			<div>
				<div>
					<div>{user.name}</div>
					<div>{user.status}</div>
				</div>
				<div>
					{/* <div>{"user.location.country"}</div>
                            <div>{"user.location.city"}</div>*/}
				</div>
			</div>
		</div>
	)
}

export default User;