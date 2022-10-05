import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import { initializeApp, unhandleError } from './redux/app-reducer ';
import { connect } from 'react-redux';
import Preloader from './components/common/preloader/Preloader';
import React, { Suspense } from 'react';
import GlobalError from './components/common/GlobalError/GlobalError';
//import DialogsContainer from "./components/Dialogs/DialogsContainer";
//import ProfileContainer from "./components/Profile/ProfileContainer";
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));



class App extends React.Component {

	//Функция для поиска не отловленных ошибок
	catchAllUnhandledErrors = (reason, promiseRejectionEvent) => {
		const error = "Some error occured"
		unhandleError(error)
		//console.error(promiseRejectionEvent);
	}

	componentDidMount() {
		this.props.initializeApp()
		// поиск не отловленых ошибок 
		window.addEventListener("unhandlerejection", this.catchAllUnhandledErrors)
	}

	componentWillUnmount() {
		window.removeEventListener("unhandlerejection", this.catchAllUnhandledErrors)
	}

	render() {
		/* if (!this.props.initialized) {
			return <Preloader />
		} */

		return (
			<div className='app-wrapper'>
				{this.props.globalError ? <GlobalError globalError={this.props.globalError} /> : ''}
				<HeaderContainer />
				<Navbar />
				<div className='app-wrapper-content'>
					<Suspense fallback={<div><Preloader /></div>}>
						<Routes>
							<Route path="/" element={<Navigate to={'/profile'} />} />
							<Route path="/profile/:userId" element={<ProfileContainer />} />
							<Route path="/profile" element={<ProfileContainer />} />
							<Route path="/dialogs/*"
								element={<DialogsContainer />} />
							<Route path="/users" element={<UsersContainer />} />
							<Route path="/news" element={<News />} />
							<Route path="/music" element={<Music />} />
							<Route path="/settings" element={<Settings />} />
							<Route path="/login" element={<Login />} />
							<Route path="*" element={<div>404 NOT FOUND</div>} />
						</Routes>
					</Suspense>
					{/* <ProfileInfo /> */}
					{/* <Dialogs /> */}
				</div>
			</div>
		);
	};
}

const mapStateToProps = (state) => ({
	initialized: state.app.initialized,
	globalError: state.app.globalError
})


export default connect(mapStateToProps, { initializeApp, unhandleError })(App);
