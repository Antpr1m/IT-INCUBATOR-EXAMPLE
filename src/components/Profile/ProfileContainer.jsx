import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getProfile, getStatus, updateStatus, savePhoto, saveProfile } from "../../redux/profile-reducer";
import { Navigate, useLocation, useNavigate, useParams, } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

function withRouter(Component) {
	function ComponentWithRouterProp(props) {
		let location = useLocation();
		let navigate = useNavigate();
		let params = useParams();
		return (
			<Component
				{...props}
				router={{ location, navigate, params }}
			/>
		);
	}

	return ComponentWithRouterProp;
}



class ProfileContainer extends React.Component {

	refreshProfile() {
		let userId = this.props.router.params.userId;
		if (!userId) {
			// userId = 2
			userId = this.props.authorizedUserId;
			if (!userId) {
				<Navigate to={'/login'} />
			}
		}
		this.props.getProfile(userId)
		this.props.getStatus(userId) //Запрос статуса для его редактирования на страничке профиля
		//переделать на функ. компоненту и сделать редирект на "/login", если !userId
	}

	//Запросы на сервер делать в componentDidMount
	componentDidMount() {
		this.refreshProfile()
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.router.params.userId != prevProps.router.params.userId) {
			this.refreshProfile()
		}
	}

	render() {
		return (
			<Profile {...this.props} profile={this.props.profile}
				isOwner={!this.props.router.params.userId}
				status={this.props.status}
				updateStatus={this.props.updateStatus}
				savePhoto={this.props.savePhoto}
				saveProfile={this.props.saveProfile} />
		)
	}
}


//чтобы не прокидывать каждый раз isAuth
/*let mapStateToPropsForRedirect = (state) => ({
	 isAuth: state.auth.isAuth
})*/
/*authRedirectComponent = connect(mapStateToPropsForRedirect)(authRedirectComponent)*///connect для HOC, для доступа к state



let mapStateToProps = (state) => ({
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	authorizedUserId: state.auth.id,
	isAuth: state.auth.isAuth
})

export default compose(
	connect(mapStateToProps, { getProfile, getStatus, updateStatus, savePhoto, saveProfile }),
	withRouter,
	withAuthRedirect
)(ProfileContainer)


