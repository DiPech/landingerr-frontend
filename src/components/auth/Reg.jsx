import React from "react";
import {Button, Col, Row} from "reactstrap";
import {connect} from "react-redux";
import {setToken, setEmailText, setPasswordText, setRepeatPasswordText} from "../../store/auth/actions";
import {withToastManager} from "react-toast-notifications";
import {validateEmail} from "../../util/string";

class Reg extends React.Component {
    constructor(props) {
        super(props);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onRepeatPasswordChange = this.onRepeatPasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.ensureInputValid = this.ensureInputValid.bind(this);
    }
    onEmailChange(event) {
        this.props.setEmailText(event.target.value);
    }
    onPasswordChange(event) {
        this.props.setPasswordText(event.target.value);
    }
    onRepeatPasswordChange(event) {
        this.props.setRepeatPasswordText(event.target.value);
    }
    onSubmit() {
        try {
            this.ensureInputValid();
        } catch (e) {
            this.props.toastManager.add(e.message, { appearance: 'error' });
            return;
        }
        this.props.toastManager.add('Вы успешно авторизованы', { appearance: 'success' });
        setTimeout(function () {
            this.props.setToken('TOKEN1111111');
        }.bind(this), 1000);
    }
    ensureInputValid() {
        if (this.props.email.length === 0 || !validateEmail(this.props.email)) {
            throw new Error("Введите корректный Email");
        }
        if (this.props.password.length < 5) {
            throw new Error("Пароль слишком короткий");
        }
        if (this.props.password !== this.props.repeatPassword) {
            throw new Error("Введенные пароли не совпадают");
        }
    }
    render() {
        return (
            <div>
                <h2>Регистрация</h2>
                <form>
                    <Row>
                        <Col sm="6" md="4">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email</label>
                                <input type="email" className="form-control"
                                       placeholder="ivan.ivanov@gmail.com" required
                                       value={this.props.email}
                                       onChange={this.onEmailChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Пароль</label>
                                <input type="password" className="form-control"
                                       placeholder="**************" required
                                       value={this.props.password}
                                       onChange={this.onPasswordChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Повторите пароль</label>
                                <input type="password" className="form-control"
                                       placeholder="**************" required
                                       value={this.props.repeatPassword}
                                       onChange={this.onRepeatPasswordChange}/>
                            </div>
                            <Button outline color="primary" onClick={this.onSubmit}>Зарегистрироваться</Button>
                        </Col>
                    </Row>
                </form>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(Reg));
