import {Navigate} from "react-router-dom";
import React, {Component} from "react";
import {connect} from "react-redux";


let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
})
//Class HOC
export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if(!this.props.isAuth) return <Navigate to='/login'/>
            return <Component {...this.props} />
        }
    }
    let connectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)
    return connectedAuthRedirectComponent;
}

//Functional HOC

