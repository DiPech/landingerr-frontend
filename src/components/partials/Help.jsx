import React, {Fragment} from 'react';
import {FaQuestionCircle} from "react-icons/fa";
import ReactTooltip from "react-tooltip";

export default class Help extends React.Component {
    render() {
        // from: https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
        let uniqueId = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
        return (
            <Fragment>
                <FaQuestionCircle data-tip={this.props.message}
                                  data-for={"tooltip-help-" + uniqueId}/>
                <ReactTooltip effect="solid"
                              id={"tooltip-help-" + uniqueId}/>

            </Fragment>
        );
    }
}
