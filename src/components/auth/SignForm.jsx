import React, {Fragment} from "react";
import {Button, Col, Row} from "reactstrap";
import {connect} from "react-redux";
import {setEmailText, setPasswordText, setRepeatPasswordText, setToken} from "../../store/auth/actions";
import {withToastManager} from "react-toast-notifications";
import {validateEmail} from "../../util/string";
import {Redirect} from "react-router-dom";
import {SIGN_FORM_REG} from "./constants";
import {FaSignInAlt, FaUserPlus} from "react-icons/fa";

const FIELD_EMAIL = "email";
const FIELD_PASSWORD = "password";
const FIELD_REPEAT_PASSWORD = "repeat_password";

class SignForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleEmailChange = this.handleChange.bind(this, FIELD_EMAIL);
        this.handlePasswordChange = this.handleChange.bind(this, FIELD_PASSWORD);
        this.handleRepeatPasswordChange = this.handleChange.bind(this, FIELD_REPEAT_PASSWORD);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isReg = this.isReg.bind(this);
        this.ensureInputValid = this.ensureInputValid.bind(this);
    }
    handleChange(type, event) {
        if (type === FIELD_EMAIL) {
            this.props.setEmailText(event.target.value);
        } else if (type === FIELD_PASSWORD) {
            this.props.setPasswordText(event.target.value);
        } else if (type === FIELD_REPEAT_PASSWORD) {
            this.props.setRepeatPasswordText(event.target.value);
        }
    }
    handleSubmit() {
        try {
            this.ensureInputValid();
        } catch (e) {
            this.props.toastManager.add(e.message, {appearance: "error"});
            return;
        }
        this.props.toastManager.add("Отправка... ", {appearance: "info", autoDismissTimeout: 1000});
        setTimeout(function () {
            let actionName = this.isReg() ? "зарегистрированы" : "авторизованы";
            this.props.toastManager.add("Вы успешно " + actionName, {appearance: "success", autoDismissTimeout: 1000});
            let token = "TOKEN1111111";
            localStorage.setItem("token", token);
            this.props.setToken(token);
        }.bind(this), 2000);
    }
    isReg() {
        return this.props.type === SIGN_FORM_REG;
    }
    ensureInputValid() {
        if (this.props.email.length === 0 || !validateEmail(this.props.email)) {
            throw new Error("Введите корректный Email");
        }
        if (this.props.password.length < 5) {
            throw new Error("Пароль слишком короткий");
        }
        if (this.isReg()) {
            if (this.props.password !== this.props.repeatPassword) {
                throw new Error("Введенные пароли не совпадают");
            }
        }
    }
    render() {
        return (
            this.props.token !== null ? (
                <Redirect
                    to={{
                        pathname: "/cabinet",
                        state: {from: this.props.location}
                    }}
                />
            ) : (
                <Fragment>
                    <h2>{this.isReg() ? "Регистрация" : "Вход"}</h2>
                    <form>
                        <Row>
                            <Col sm="6" md="4">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control"
                                           placeholder="ivan.ivanov@gmail.com" required
                                           value={this.props.email}
                                           onChange={this.handleEmailChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Пароль</label>
                                    <input type="password" className="form-control"
                                           placeholder="**************" required
                                           value={this.props.password}
                                           onChange={this.handlePasswordChange}/>
                                </div>
                                {this.isReg() && (
                                    <div className="form-group">
                                        <label>Повторите пароль</label>
                                        <input type="password" className="form-control"
                                               placeholder="**************" required
                                               value={this.props.repeatPassword}
                                               onChange={this.handleRepeatPasswordChange}/>
                                    </div>
                                )}
                                <Button outline color="primary" onClick={this.handleSubmit}>
                                    {this.isReg() ? (
                                        <Fragment>
                                            <FaUserPlus/> Зарегистрироваться
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <FaSignInAlt/> Войти
                                        </Fragment>
                                    )}
                                </Button>
                            </Col>
                        </Row>
                    </form>
                </Fragment>
            )
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        email: state.auth.email,
        password: state.auth.password,
        repeatPassword: state.auth.repeatPassword,
    };
};

const mapDispatchToProps = {
    setEmailText,
    setPasswordText,
    setRepeatPasswordText,
    setToken
};

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(SignForm));
