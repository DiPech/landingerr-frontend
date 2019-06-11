import React from 'react';
import {Col, Row} from "reactstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class OrderThirdStep extends React.Component {
    render() {
        return (
            <Row>
                <Col>
                    Третий шаг
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderThirdStep);
