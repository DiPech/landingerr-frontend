import React from "react";
import SignForm, {SIGN_FORM_AUTH} from "./SignForm";

export default class Auth extends React.Component {
    render() {
        return (
            <SignForm type={SIGN_FORM_AUTH}/>
        );
    }
}
