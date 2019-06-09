import React from "react";
import SignForm, {SIGN_FORM_REG} from "./SignForm";

export default class Reg extends React.Component {
    render() {
        return (
            <SignForm type={SIGN_FORM_REG}/>
        );
    }
}
