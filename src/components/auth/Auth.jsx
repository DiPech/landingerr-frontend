import React from "react";
import {SIGN_FORM_AUTH} from "./constants";
import SignForm from "./SignForm";

export default class Auth extends React.Component {
    render() {
        return (
            <SignForm type={SIGN_FORM_AUTH}/>
        );
    }
}
