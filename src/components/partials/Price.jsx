import React, {Fragment} from 'react';
import {formatNumber} from "../../util/number";
import {FaRubleSign} from "react-icons/fa";

export default class Price extends React.Component {
    constructor(props) {
        super(props);
        this.formatPrice = this.formatPrice.bind(this);
    }
    formatPrice(value) {
        return formatNumber(value, 0, ".", " ");
    }
    render() {
        return (
            <Fragment>
                <b>{this.formatPrice(this.props.value)}</b> <FaRubleSign/>
            </Fragment>
        );
    }
}
