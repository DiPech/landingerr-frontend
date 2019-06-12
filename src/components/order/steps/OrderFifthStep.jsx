import React, {Fragment} from 'react';
import {Button, Col, Row} from "reactstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import OrderCommentForm from "../partial/OrderCommentForm";
import {setComment, setCommentImages, setPublic} from "../../../store/order/actions";
import {FaHandPointer} from "react-icons/fa";
import OrderCard from "../partial/OrderCard";

class OrderFifthStep extends React.Component {
    constructor(props) {
        super(props);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.handleCommentKeyUp = this.handleCommentKeyUp.bind(this);
        this.handlePublicChange = this.handlePublicChange.bind(this);
    }
    handlePublicChange(state, value) {
        this.props.setPublic(state);
    }
    handleImageUpload(imageIds) {
        this.props.setCommentImages(imageIds);
    }
    handleCommentKeyUp(comment) {
        this.props.setComment(comment);
    }
    render() {
        return (
            <Fragment>
                <Row>
                    <Col>
                        <OrderCommentForm keyword="comment" title="Комментарий к заказу"
                                          placeholder="Необязательно"
                                          help="Оставьте комментарий к заказу, если вам есть что сказать дополнительно.
                                      Мы обязательно учтём все ваши пожелания!"
                                          onImageUpload={this.handleImageUpload}
                                          onCommentKeyUp={this.handleCommentKeyUp}/>
                    </Col>
                </Row>
                <Row>
                    <OrderCard type="checkbox"
                               name="public" title="Добавить итоговый лендинг в магазин лендингов"
                               description="
                               Другие пользователи смогут приобрести его, а вы получите вознаграждение в размере
                               10% от суммы их заказа. Накопленными рублями можно оплатить новые заказы, или же
                               вывести на карту или WebMoney."
                               colNonActive={12} colActive={12}
                               withoutPrice value="is_public"
                               active={this.props.public}
                               onChange={this.handlePublicChange}/>
                </Row>
                <Row>
                    <Col>
                        <Button color="primary" size="lg" className="mt-3">
                            <FaHandPointer className="mr-2"/>
                            Оформить заказ
                        </Button>
                    </Col>
                </Row>
            </Fragment>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        public: state.order.public,
        commentImageIds: state.order.commentImageIds,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    setComment,
    setCommentImages,
    setPublic
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderFifthStep);
