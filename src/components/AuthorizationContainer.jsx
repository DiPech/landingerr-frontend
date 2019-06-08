import React from 'react';
import Authorization from "./Authorization";
import {connect} from "react-redux";
import {setEmailText, setPasswordText} from "../store/authorization/actions";

class AuthorizationContainer extends React.Component {
    render() {
        return (
            <Authorization email={this.props.email}
                           password={this.props.password}
                           setEmailText={this.props.setEmailText}
                           setPasswordText={this.props.setPasswordText}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.authorization.email,
        password: state.authorization.password,
    };
};

const mapDispatchToProps = {
    setEmailText,
    setPasswordText
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationContainer);
