import React from 'react';
import {Button, Row, Col} from "reactstrap";

export default class Authorization extends React.Component {
    constructor(props) {
        super(props);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    onEmailChange(event) {
        this.props.setEmailText(event.target.value);
    }

    onPasswordChange(event) {
        this.props.setPasswordText(event.target.value);
    }

    render() {
        return (
            <div className="authorization">
                <h2>Вход</h2>
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
                            <Button outline color="primary">Войти</Button>
                        </Col>
                    </Row>
                </form>
            </div>
        );
    }
}
