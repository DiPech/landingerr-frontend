import React from 'react';
import {FormGroup, FormText, Input, Label, Row} from "reactstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import OrderCard from "../partial/OrderCard";
import {getOptionDescription, isValidOptionValue, updatePlacement} from "../functions";
import {setOption} from "../../../store/order/actions";
import {OPTION_PLACEMENT_DEPLOY_TO_CLIENT_SERVER, OPTION_PLACEMENT_DOWNLOAD_LANDING} from "../constants";

class OrderFourthStep extends React.Component {
    constructor(props) {
        super(props);
        this.rerender = this.rerender.bind(this);
        this.handlePlacementChange = this.handlePlacementChange.bind(this);
        this.handleAccessesToServerKeyUp = this.handleKeyUp.bind(this, OPTION_PLACEMENT_DEPLOY_TO_CLIENT_SERVER);
    }
    rerender() {
        this.forceUpdate();
        this.props.rerenderParent();
    }
    handlePlacementChange(state, value) {
        if (state) {
            updatePlacement(value);
            this.rerender();
        }
    }
    handleKeyUp(type, event) {
        if (type === OPTION_PLACEMENT_DEPLOY_TO_CLIENT_SERVER) {
            this.props.setOption(type, event.target.value);
        }
        this.rerender();
    }
    render() {
        return (
            <Row>
                <OrderCard type="radio"
                           name="placement" title="Скачать архив"
                           description={getOptionDescription(this.props.options, OPTION_PLACEMENT_DOWNLOAD_LANDING)}
                           colNonActive={4} colActive={8} colNoOne={6}
                           noOneSelected={this.props.placement === null}
                           priceMin={0} priceMax={0}
                           active={this.props.placement === OPTION_PLACEMENT_DOWNLOAD_LANDING}
                           value={OPTION_PLACEMENT_DOWNLOAD_LANDING}
                           onChange={this.handlePlacementChange}/>
                <OrderCard type="radio"
                           name="placement" title="Загрузить на ваш сервер"
                           description={getOptionDescription(this.props.options, OPTION_PLACEMENT_DEPLOY_TO_CLIENT_SERVER)}
                           colNonActive={4} colActive={8} colNoOne={6}
                           noOneSelected={this.props.placement === null}
                           priceMin={50} priceMax={50}
                           active={this.props.placement === OPTION_PLACEMENT_DEPLOY_TO_CLIENT_SERVER}
                           value={OPTION_PLACEMENT_DEPLOY_TO_CLIENT_SERVER}
                           error={!isValidOptionValue(this.props.selectedOptions, OPTION_PLACEMENT_DEPLOY_TO_CLIENT_SERVER)}
                           onChange={this.handlePlacementChange}>
                    <FormGroup>
                        <Label for="textarea-server-access">
                            Доступ к вашему серверу (FTP):
                        </Label>
                        <Input type="textarea" rows={6} id="textarea-server-access"
                               onKeyUp={this.handleAccessesToServerKeyUp}
                               placeholder="
                               Например: IP: 10.34.92.53 Логин: ftp_user Пароль: password2385832 Порт: 21
                               "/>
                        <FormText color="muted">
                            Укажите в это поле все необходимые для доступа
                            данные:<br/>
                            1) Адрес сервера (IP или домен).<br/>
                            2) Логин и пароль.<br/>
                            3) Номер порта, если он не стандартный (обычно 21).
                        </FormText>
                    </FormGroup>
                </OrderCard>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        options: state.order.options,
        placement: state.order.placement,
        selectedOptions: state.order.selectedOptions,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    setOption
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderFourthStep);
