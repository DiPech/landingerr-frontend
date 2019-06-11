import React, {Fragment} from 'react';
import {FormGroup, FormText, Input, Label, Row, Spinner} from "reactstrap";
import OrderCard from "../partial/OrderCard";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchOrderOptions} from "../../../api/order";
import {removeOption, setOption} from "../../../store/order/actions";
import Col from "reactstrap/es/Col";

const OPTION_GROUP_EDIT = "edit";
export const OPTION_EDIT_CONTACTS = "edit_contacts";
export const OPTION_ADD_CLIENT_COUNTERS = "add_client_counters";
export const OPTION_CLIENT_CHANGES = "client_changes";

class OrderSecondStep extends React.Component {
    constructor(props) {
        super(props);
        this.rerender = this.rerender.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.isOptionSelected = this.isOptionSelected.bind(this);
        this.handleContactsKeyUp = this.handleKeyUp.bind(this, OPTION_EDIT_CONTACTS);
        this.handleClientCountersKeyUp = this.handleKeyUp.bind(this, OPTION_ADD_CLIENT_COUNTERS);
        this.handleClientChangesKeyUp = this.handleKeyUp.bind(this, OPTION_CLIENT_CHANGES);
    }
    rerender() {
        this.forceUpdate();
        this.props.rerenderParent();
    }
    componentWillMount() {
        if (this.props.options === null) {
            this.props.fetchOrderOptions();
        }
    }
    handleKeyUp(type, event) {
        switch (type) {
            case OPTION_EDIT_CONTACTS:
            case OPTION_ADD_CLIENT_COUNTERS:
            case OPTION_CLIENT_CHANGES:
                this.props.setOption(type, event.target.value);
                break;
        }
        this.rerender();
    }
    handleChange(state, keyword) {
        if (state) {
            this.props.setOption(keyword, "");
        } else {
            this.props.removeOption(keyword);
        }
        this.rerender();
    }
    isOptionSelected(keyword) {
        return this.props.selectedOptions.hasOwnProperty(keyword);
    }
    render() {
        return (
            <Row>
                {this.props.options === null || this.props.isOptionsLoading ? (
                    <Col>
                        Загрузка данных <Spinner size="sm" color="secondary"/>
                    </Col>
                ) : (
                    <Fragment>
                        {this.props.options.map((option, i) => {
                            if (option.group !== OPTION_GROUP_EDIT) {
                                return (" ");
                            }
                            return (
                                <OrderCard key={i} type="checkbox"
                                           name="option" title={option.name}
                                           colNonActive={12} colActive={12}
                                           priceMin={option.priceMin} priceMax={option.priceMax}
                                           active={this.isOptionSelected(option.keyword)}
                                           value={option.keyword}
                                           onChange={this.handleChange}>
                                    {(function () {
                                        switch (option.keyword) {
                                            case OPTION_EDIT_CONTACTS:
                                                return (
                                                    <FormGroup>
                                                        <Label for="textarea-contacts">
                                                            Информация о заменяемых контактах
                                                        </Label>
                                                        <Input type="textarea" rows={6} id="textarea-contacts"
                                                               onKeyUp={this.handleContactsKeyUp}
                                                               placeholder="
                                                               Например: В шапке заменить телефон на +7 (987) 654-32-10,
                                                               в футере добавить следующую контактную информацию...
                                                               "/>
                                                        <FormText color="muted">
                                                            Подробно опишите где и какие контакты на лендинге на какие
                                                            ваши контакты нужно заменить.
                                                        </FormText>
                                                    </FormGroup>
                                                );
                                            case OPTION_ADD_CLIENT_COUNTERS:
                                                return (
                                                    <FormGroup>
                                                        <Label for="textarea-client-counters">
                                                            Коды счётчиков
                                                        </Label>
                                                        <Input type="textarea" rows={6} id="textarea-client-counters"
                                                               onKeyUp={this.handleClientCountersKeyUp}
                                                               placeholder="
                                                               Например: &lt;noscript&gt;&lt;div&gt;&lt;img src=&quot;
                                                               https://mc.yandex.ru/watch/XXXXXX&quot;....
                                                               "/>
                                                        <FormText color="muted">
                                                            Если кодов несколько - расположите друг под другом.
                                                        </FormText>
                                                    </FormGroup>
                                                );
                                            case OPTION_CLIENT_CHANGES:
                                                return (
                                                    <FormGroup>
                                                        <Label for="textarea-client-changes">
                                                            Опишите что необходимо изменить
                                                        </Label>
                                                        <Input type="textarea" rows={6} id="textarea-client-changes"
                                                               onKeyUp={this.handleClientChangesKeyUp} placeholder="
                                                               Например: удалить картинку в блоке слева, в блоке справа
                                                               изменить текст на этот «...». Заменить картинку в шапке
                                                               на картинку №4, прикреплённую ниже.
                                                               Скриншот: http://joxi.ru/KAx7q5wcZYELw2
                                                               "/>
                                                        <FormText color="muted">
                                                            Максимально подробно опишите какие хотите правки.
                                                            Вы можете прикреплять изображения и ссылаться на них при
                                                            описании. Для картинок также можно воспользоваться программой{" "}
                                                            <b>Joxi</b> (делает скриншот, можно тут же нарисовать стрелки,
                                                            подписать текст, и получить ссылку на изображение, которое
                                                            можно прямо в описание вставить как простой текст).
                                                        </FormText>
                                                    </FormGroup>
                                                );
                                            default:
                                                return null;
                                        }
                                    }.bind(this))()}
                                </OrderCard>
                            )
                        })}
                    </Fragment>
                )}
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isOptionsLoading: state.order.isOptionsLoading,
        options: state.order.options,
        selectedOptions: state.order.selectedOptions,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchOrderOptions,
    setOption,
    removeOption
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderSecondStep);
