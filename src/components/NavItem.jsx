import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

class NavItem extends React.Component {
    render() {
        console.log(this.context);
        let isActive = this.context.router.isActive(this.props.to, true);
        let className = isActive ? "active" : "";
        return (
            <li className={className}>
                <Link {...this.props}/>
            </li>
        );
    }
}

NavItem.contextTypes = {
    router: PropTypes.object
};

export default NavItem;
