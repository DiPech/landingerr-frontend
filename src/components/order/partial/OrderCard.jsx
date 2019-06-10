import React, {Fragment} from 'react';
import {Card, CardTitle, Col, FormGroup, Input, Label} from "reactstrap";
import styled from "styled-components";

const SFormGroup = styled(FormGroup)`
    &:hover * {
        cursor: pointer;
    }
`;

export default class OrderCard extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    onChange(event) {
        if (event.target.checked) {
            this.props.onChange(this.props.value)
        }
    }
    render() {
        return (
            <Col xs={12} sm={this.props.active ? 6 : 3}>
                <Card body outline color={this.props.active ? "primary" : "secondary"}>
                    <CardTitle>
                        <SFormGroup check>
                            <Input type="radio" name={"input_" + this.props.name}
                                   id={"input-radio-source-" + this.props.value}
                                   value={this.props.value}
                                   checked={this.props.active}
                                   onChange={this.onChange}/>
                            <Label for={"input-radio-source-" + this.props.value}
                                   check={this.props.active}>
                                {this.props.title}
                            </Label>
                        </SFormGroup>
                    </CardTitle>
                    {this.props.active && (
                        <Fragment>
                            {this.props.children}
                        </Fragment>
                    )}
                </Card>
            </Col>
        );
    }
}
