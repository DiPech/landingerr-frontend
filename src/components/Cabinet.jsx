import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {setEmail, setName, setPhone} from "../store/user/actions";
import {setToken} from "../store/auth/actions";
import {Button, Col, Row} from "reactstrap";
import {withToastManager} from "react-toast-notifications";

class Cabinet extends React.Component {
    constructor(props) {
        super(props);
        this.onNameChange = this.onNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPhoneChange = this.onPhoneChange.bind(this);
        this.logout = this.logout.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.state = {isEdit: false};
    }
    onNameChange(event) {
        this.props.setName(event.target.value);
    }
    onEmailChange(event) {
        this.props.setEmail(event.target.value);
    }
    onPhoneChange(event) {
        this.props.setPhone(event.target.value);
    }
    logout() {
        this.props.setToken(null);
        localStorage.removeItem("token");
        this.props.toastManager.add("Вы вышли из аккаунта", {appearance: "success"});
    }
    toggleEdit() {
        this.setState({
            isEdit: !this.state.isEdit
        });
    }
    render() {
        let content;
        if (this.state.isEdit) {
            content = <Fragment>
                <div className="form-group">
                    <label>Имя</label>
                    <input type="email" className="form-control"
                           placeholder="Иванов Иван" required
                           value={this.props.name}
                           onChange={this.onNameChange}/>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control"
                           placeholder="ivan.ivanov@gmail.com" required
                           value={this.props.email}
                           onChange={this.onEmailChange}/>
                </div>
                <div className="form-group">
                    <label>Номер телефона</label>
                    <input type="text" className="form-control"
                           placeholder="+7 (987) 654-32-10" required
                           value={this.props.phone}
                           onChange={this.onPhoneChange}/>
                </div>
                <Button outline color="secondary" onClick={this.toggleEdit}>Отменить</Button>
                <Button outline color="primary" className="ml-2">Применить</Button>
            </Fragment>;
        } else {
            content = <Fragment>
                <p><b>Имя:</b> {this.props.name}</p>
                <p><b>Email:</b> {this.props.email}</p>
                <p><b>Номер телефона:</b> {this.props.phone}</p>
                <Button outline color="primary" onClick={this.toggleEdit}>Изменить данные</Button>
                <br/>
                <Button outline color="dark" className="mt-2" onClick={this.logout}>Выйти из аккаунта</Button>
            </Fragment>;
        }
        return (
            <div>
                <h2>Личный кабинет</h2>
                <form>
                    <Row>
                        <Col sm="6" md="4">
                            {content}
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
        name: state.user.name,
        email: state.user.email,
        phone: state.user.phone,
    };
};

const mapDispatchToProps = {
    setName,
    setEmail,
    setPhone,
    setToken
};

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(Cabinet));
