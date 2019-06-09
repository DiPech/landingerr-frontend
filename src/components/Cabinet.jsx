import React from 'react';
import {connect} from "react-redux";
import {setEmail, setName, setPhone} from "../store/user/actions";
import {Button, Col, Row} from "reactstrap";

class Cabinet extends React.Component {
    constructor(props) {
        super(props);
        this.onNameChange = this.onNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPhoneChange = this.onPhoneChange.bind(this);
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
    render() {
        return (
            <div>
                <h2>Личный кабинет</h2>
                <form>
                    <Row>
                        <Col sm="6" md="4">
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
                            <Button outline color="primary">Войти</Button>
                        </Col>
                    </Row>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.user.name,
        email: state.user.email,
        phone: state.user.phone,
    };
};

const mapDispatchToProps = {
    setName,
    setEmail,
    setPhone
};

export default connect(mapStateToProps, mapDispatchToProps)(Cabinet);
