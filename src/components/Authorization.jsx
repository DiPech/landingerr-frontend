import React from 'react';

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
                <h2>Authorization</h2>
                <form>
                    <input type="email" name="email"
                           value={this.props.email}
                           onChange={this.onEmailChange}/>
                    <input type="password" name="password"
                           value={this.props.password}
                           onChange={this.onPasswordChange}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}
