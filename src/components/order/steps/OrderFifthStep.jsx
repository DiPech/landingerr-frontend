import React, {Fragment} from 'react';
import {Button, Col, Row} from "reactstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import OrderCommentForm from "../partial/OrderCommentForm";
import {setComment, setCommentImages, setPublic} from "../../../store/order/actions";
import {FaHandPointer} from "react-icons/fa";
import OrderCard from "../partial/OrderCard";
import Price from "../../partials/Price";

class OrderFifthStep extends React.Component {
    constructor(props) {
        super(props);
        this.rerender = this.rerender.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.handleCommentKeyUp = this.handleCommentKeyUp.bind(this);
        this.handlePublicChange = this.handlePublicChange.bind(this);
        this.calcPrice = this.calcPrice.bind(this);
        this.calcMinPrice = this.calcMinPrice.bind(this);
        this.calcMaxPrice = this.calcMaxPrice.bind(this);
        this.isExactPrice = this.isExactPrice.bind(this);
    }
    rerender() {
        this.forceUpdate();
        this.props.rerenderParent();
    }
    handlePublicChange(state, value) {
        this.props.setPublic(state);
        this.rerender();
    }
    handleImageUpload(imageIds) {
        this.props.setCommentImages(imageIds);
        this.rerender();
    }
    handleCommentKeyUp(comment) {
        this.props.setComment(comment);
        this.rerender();
    }
    calcPrice(priceKey) {
        let price = 0;
        let selectedOptionKeywords = Object.keys(this.props.selectedOptions);
        for (let option of this.props.options) {
            if (selectedOptionKeywords.includes(option.keyword)) {
                price += option[priceKey];
            }
        }
        return price;
    }
    calcMinPrice() {
        return this.calcPrice("priceMin");
    }
    calcMaxPrice() {
        return this.calcPrice("priceMax");
    }
    isExactPrice() {
        return this.calcMinPrice() === this.calcMaxPrice();
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
                            Оформить заказ{" "}
                            {this.isExactPrice() && (
                                <Fragment>
                                    на сумму <Price value={this.calcMinPrice()}/>
                                </Fragment>
                            )}
                        </Button>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        options: state.order.options,
        selectedOptions: state.order.selectedOptions,
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
