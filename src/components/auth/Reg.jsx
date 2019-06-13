import React from "react";
import {SIGN_FORM_REG} from "./constants";
import SignForm from "./SignForm";

export default class Reg extends React.Component {
    render() {
        return (
            <SignForm type={SIGN_FORM_REG}/>
        );
    }
}
