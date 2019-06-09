import React, {Fragment} from "react";
import {NavLink as RRNavLink, withRouter} from "react-router-dom";
import {FaSignInAlt, FaUser, FaUserPlus} from "react-icons/fa";
import {NavLink} from 'reactstrap';
import {connect} from "react-redux";

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.isAuth = this.isAuth.bind(this);
    }
    isAuth() {
        return this.props.token !== null;
    }
    render() {
        return (
            <Fragment>
                <ul className="navbar-nav mr-auto">
                    <NavLink to="/" exact tag={RRNavLink} activeClassName="active">Главная</NavLink>
                    <NavLink to="/orders" tag={RRNavLink} activeClassName="active">Заказы</NavLink>
                    <NavLink to="/shop" tag={RRNavLink} activeClassName="active">Магазин лендингов</NavLink>
                </ul>
                <ul className="navbar-nav navbar-right">
                    {this.isAuth() ? (
                        <NavLink to="/cabinet" tag={RRNavLink} activeClassName="active">
                            <FaUser className="mr-1"/>
                            Личный кабинет
                        </NavLink>
                    ) : (
                        <Fragment>
                            <NavLink to="/auth" tag={RRNavLink} activeClassName="active">
                                <FaSignInAlt className="mr-1"/>
                                Войти
                            </NavLink>
                            <NavLink to="/reg" tag={RRNavLink} activeClassName="active">
                                <FaUserPlus className="mr-1"/>
                                Зарегистрироваться
                            </NavLink>
                        </Fragment>
                    )}
                </ul>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    };
};

export default connect(mapStateToProps)(withRouter(Navigation));
