import React, {Fragment} from 'react';
import styled from "styled-components";
import Spinner from "reactstrap/es/Spinner";
import {FaTimes} from "react-icons/fa";

const SImg = styled.img`
    max-height: 64px;
    max-width: 64px;
    border: 1px solid gray;
    border-radius: 4px;
`;
const SDivWrapper = styled.div`
    display: inline-block;
    vertical-align: top;
    margin-right: 10px;
    margin-bottom: 10px;
    position: relative;
    max-width: 64px;
    max-height: 64px;
`;
const SDivSpinner = styled.div`
    width: 2rem;
    height: 2rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
`;
const SDivBtnRemove = styled(FaTimes)`
    color: red;
    width: 15px;
    height: 15px;
    position: absolute;
    right: 2px;
    top: 2px;
    opacity: 0.5;
    &:hover {
        opacity: 1;
        cursor: pointer;
    }
`;

class OrderCommentFormImage extends React.Component {
    constructor(props) {
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
    }
    handleRemove() {
        this.props.onRemove(this.props.index);
    }
    render() {
        return (
            <SDivWrapper>
                <SImg src={this.props.src}/>
                {this.props.loading ? (
                    <SDivSpinner><Spinner/></SDivSpinner>
                ) : (
                    <Fragment>
                        {this.props.removable && (
                            <SDivBtnRemove onClick={this.handleRemove}/>
                        )}
                    </Fragment>
                )}
            </SDivWrapper>
        );
    }
}

OrderCommentFormImage.defaultProps = {
    src: process.env.PUBLIC_URL + "/no-image.jpg",
    onRemove: () => {
        alert("Pass onRemove to component!");
    }
};

export default OrderCommentFormImage;
