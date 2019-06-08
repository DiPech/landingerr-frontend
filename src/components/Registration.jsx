import React from 'react';

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onRepeatPasswordChange = this.onRepeatPasswordChange.bind(this);
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
    render() {
        return (
            <div className="registration">
                <h2>Registration</h2>
                <form>
                    <input type="email" name="email"
                           value={this.props.email}
                           onChange={this.onEmailChange}/>
                    <input type="password" name="password"
                           value={this.props.password}
                           onChange={this.onPasswordChange}/>
                    <input type="password" name="repeat_password"
                           value={this.props.repeatPassword}
                           onChange={this.onRepeatPasswordChange}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}
