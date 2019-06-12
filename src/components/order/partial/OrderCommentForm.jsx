import React, {Fragment} from 'react';
import {Button, Col, FormGroup, FormText, Input, Label, Row} from "reactstrap";
import {FaFileUpload} from "react-icons/fa";
import styled from "styled-components";
import {uploadTemporaryFile} from "../../../api/files";
import OrderCommentFormImage from "./OrderCommentFormImage";

const SLabel = styled(Label)`
    margin-bottom: 0;
    padding: 3px 10px;
`;
const SButton = styled(Button)`
    padding: 0;
    margin-top: -10px;
`;

class OrderCommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.processQueueFileUploads = this.processQueueFileUploads.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.updateParent = this.updateParent.bind(this);
        this.state = {
            queue: [],
            uploading: false,
            uploadedFiles: [],
        };
        setInterval(function () {
            if (this.state.queue.length > 0 && !this.state.uploading) {
                this.setState({
                    uploading: true
                }, () => this.processQueueFileUploads());
            }
        }.bind(this), 200);
    }
    updateParent() {
        let fileIds = [];
        for (let file of this.state.uploadedFiles) {
            fileIds.push(file.id);
        }
        this.props.onImageUpload(fileIds);
    }
    handleKeyUp(event) {
        this.props.onCommentKeyUp(event.target.value);
    }
    handleRemove(index) {
        let uploadedFiles = this.state.uploadedFiles;
        uploadedFiles.splice(index, 1);
        this.setState({
            uploadedFiles
        }, () => this.updateParent());
    }
    handleChange(event) {
        let fileList = event.target.files;
        if (fileList.length === 0) {
            return;
        }
        this.setState({
            queue: [...fileList]
        });
    }
    processQueueFileUploads() {
        let queue = this.state.queue;
        let uploadedFiles = this.state.uploadedFiles;
        let file = queue.pop();
        uploadTemporaryFile(file, (response) => {
            uploadedFiles.push(response);
            this.setState({
                uploading: false,
                queue: queue,
                uploadedFiles: uploadedFiles
            }, () => this.updateParent());
        });
    }
    render() {
        return (
            <Fragment>
                <FormGroup>
                    <Label for={"textarea-" + this.props.keyword}>{this.props.title}:</Label>
                    <Input type="textarea" name={this.props.keyword} rows={6}
                           id={"textarea-" + this.props.keyword}
                           placeholder={this.props.placeholder} onKeyUp={this.handleKeyUp}/>
                    {this.props.help && (
                        <FormText color="muted">
                            {this.props.help}
                        </FormText>
                    )}
                </FormGroup>
                <Input type="file" name={"file_" + this.props.keyword} multiple className="d-none"
                       id={"input-files-" + this.props.keyword}
                       onChange={this.handleChange}/>
                <Row>
                    <Col>
                        {this.state.queue.length === 0 && (
                            <SButton color="secondary" size="sm" className="mb-2">
                                <SLabel for={"input-files-" + this.props.keyword}>
                                    <FaFileUpload className="mr-2"/>
                                    Прикрепить{this.state.uploadedFiles.length ? " еще" : ""} файлы
                                </SLabel>
                            </SButton>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.state.uploadedFiles.map((file, i) => {
                            return (
                                <OrderCommentFormImage key={i} index={i} src={file.url}
                                                       removable={this.state.queue.length === 0}
                                                       onRemove={this.handleRemove}/>
                            );
                        })}
                        {this.state.queue.map((file, i) => {
                            return (
                                <OrderCommentFormImage key={i} loading/>
                            );
                        })}
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

OrderCommentForm.defaultProps = {
    onImageUpload: () => {
        alert("Pass onImageUpload to component!");
    },
    onCommentKeyUp: () => {
        alert("Pass onCommentKeyUp to component!");
    },
};

export default OrderCommentForm;