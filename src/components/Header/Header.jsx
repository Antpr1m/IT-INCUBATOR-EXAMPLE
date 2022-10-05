import s from './Header.module.css';
import { NavLink } from "react-router-dom";

const Header = (props) => {

	return (
		<header className={s.header}>
			<div>
				<img src='https://автолого.рф/wp-content/uploads/lamborghini-logo.png' alt='' />
			</div>
			<div className={s.headerLoginBlock}>
				{props.isAuth
					? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
					: <NavLink to={'/login'}>Login</NavLink>}
			</div>
		</header>
	)
}

export default Header;

