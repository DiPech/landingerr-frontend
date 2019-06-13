import React, {Fragment} from 'react';
import {FormGroup, FormText, Input, Label, Row} from "reactstrap";
import OrderCard from "../partial/OrderCard";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {removeOption, setOption} from "../../../store/order/actions";
import {isValidOptionValue} from "../functions";
import {
    OPTION_EDIT_ADD_CLIENT_COUNTERS,
    OPTION_EDIT_CLIENT_CHANGES,
    OPTION_EDIT_EDIT_CONTACTS,
    OPTION_GROUP_EDIT
} from "../constants";

class OrderSecondStep extends React.Component {
    constructor(props) {
        super(props);
        this.rerender = this.rerender.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleContactsKeyUp = this.handleKeyUp.bind(this, OPTION_EDIT_EDIT_CONTACTS);
        this.handleClientCountersKeyUp = this.handleKeyUp.bind(this, OPTION_EDIT_ADD_CLIENT_COUNTERS);
        this.handleClientChangesKeyUp = this.handleKeyUp.bind(this, OPTION_EDIT_CLIENT_CHANGES);
        this.isOptionSelected = this.isOptionSelected.bind(this);
    }
    rerender() {
        this.forceUpdate();
        this.props.rerenderParent();
    }
    handleKeyUp(type, event) {
        let optionsWithKeyUp = [OPTION_EDIT_EDIT_CONTACTS, OPTION_EDIT_ADD_CLIENT_COUNTERS, OPTION_EDIT_CLIENT_CHANGES];
        if (optionsWithKeyUp.includes(type)) {
            this.props.setOption(type, event.target.value);
        }
        this.rerender();
    }
    handleOptionChange(state, keyword) {
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
                <Fragment>
                    {this.props.options.map((option, i) => {
                        if (option.group !== OPTION_GROUP_EDIT) {
                            return (" ");
                        }
                        return (
                            <OrderCard key={i} type="checkbox"
                                       name="option" title={option.name} description={option.description}
                                       colNonActive={12} colActive={12}
                                       priceMin={option.priceMin} priceMax={option.priceMax}
                                       active={this.isOptionSelected(option.keyword)}
                                       value={option.keyword}
                                       error={!isValidOptionValue(this.props.selectedOptions, option.keyword)}
                                       onChange={this.handleOptionChange}>
                                {(function () {
                                    switch (option.keyword) {
                                        case OPTION_EDIT_EDIT_CONTACTS:
                                            return (
                                                <FormGroup>
                                                    <Label for="textarea-contacts">
                                                        Информация о заменяемых контактах:
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
                                        case OPTION_EDIT_ADD_CLIENT_COUNTERS:
                                            return (
                                                <FormGroup>
                                                    <Label for="textarea-client-counters">
                                                        Коды счётчиков:
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
                                        case OPTION_EDIT_CLIENT_CHANGES:
                                            return (
                                                <FormGroup>
                                                    <Label for="textarea-client-changes">
                                                        Опишите что необходимо изменить:
                                                    </Label>
                                                    <Input type="textarea" rows={6} id="textarea-client-changes"
                                                           onKeyUp={this.handleClientChangesKeyUp} placeholder="
                                                               Например: удалить картинку в блоке слева, в блоке справа
                                                               изменить текст на этот «...».
                                                               Удалить всё что выделено на скриншоте:
                                                               http://joxi.ru/KAx7q5wcZYELw2
                                                               "/>
                                                    <FormText color="muted">
                                                        Максимально подробно опишите какие хотите правки.
                                                        Вы можете прикреплять изображения и ссылаться на них при
                                                        описании. Для картинок также можно воспользоваться
                                                        программой{" "}
                                                        <b>Joxi</b> (делает скриншот, можно тут же нарисовать
                                                        стрелки,
                                                        подписать текст, и получить ссылку на изображение, которое
                                                        можно прямо в описание вставить как простой текст).
                                                        <b>Если вам необходимо прикрепить файл или картинки -
                                                            прикрепите их в комментарий к заказу на шаге №5.</b>
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
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        options: state.order.options,
        selectedOptions: state.order.selectedOptions,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    setOption,
    removeOption
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderSecondStep);
