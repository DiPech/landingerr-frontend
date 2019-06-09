import React from "react";
import {setToken} from "../../store/auth/actions";
import {connect} from "react-redux";
import {Redirect, Route} from "react-router-dom";
import {withToastManager} from "react-toast-notifications";

class AuthRequiredRoute extends React.Component {
    render() {
        let isAuthenticated = this.props.token !== null;
        if (!isAuthenticated) {
            this.props.toastManager.add("Необходимо авторизоваться", {appearance: "warning"});
        }
        return (
            isAuthenticated ? (
                <Route {...this.props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/auth",
                        state: {from: this.props.location}
                    }}
                />
            )
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
    };
};

const mapDispatchToProps = {
    setToken
};

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(AuthRequiredRoute));
