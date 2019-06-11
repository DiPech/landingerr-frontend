import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import OrderCard from "../partial/OrderCard";
import {
    removeIntegrationWithPp,
    removeNotificationChannel,
    removeOption,
    setIntegrationWithPp,
    setNotificationChannel,
    setOption
} from "../../../store/order/actions";
import Row from "reactstrap/es/Row";
import {Spinner} from "reactstrap";
import Col from "reactstrap/es/Col";
import {fetchLandingIntegrationPartners, fetchLandingNotificationChannels} from "../../../api/landing";

const OPTION_GROUP_INTEGRATIONS = "integrations";
export const OPTION_COLLECT_LEADS = "collect_leads";
export const OPTION_SEND_LEADS_TO_PP = "send_leads_to_pp";

class OrderThirdStep extends React.Component {
    constructor(props) {
        super(props);
        this.rerender = this.rerender.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleChannelChange = this.handleChannelChange.bind(this);
        this.handlePartnerChange = this.handlePartnerChange.bind(this);
        this.isOptionSelected = this.isOptionSelected.bind(this);
        this.isLoadingNecessaryData = this.isLoadingNecessaryData.bind(this);
    }
    rerender() {
        this.forceUpdate();
        this.props.rerenderParent();
    }
    componentWillMount() {
        if (this.props.channels === null) {
            this.props.fetchLandingNotificationChannels();
        }
        if (this.props.partners === null) {
            this.props.fetchLandingIntegrationPartners();
        }
    }
    handleOptionChange(state, keyword) {
        if (state) {
            this.props.setOption(keyword, "");
        } else {
            this.props.removeOption(keyword);
        }
        this.rerender();
    }
    handleChannelChange(state, keyword) {
        if (state) {
            this.props.setNotificationChannel(keyword, "");
        } else {
            this.props.removeNotificationChannel(keyword);
        }
        this.rerender();
    }
    handlePartnerChange(state, keyword) {
        if (state) {
            this.props.setIntegrationWithPp(keyword, "");
        } else {
            this.props.removeIntegrationWithPp(keyword);
        }
        this.rerender();
    }
    isOptionSelected(keyword) {
        return this.props.selectedOptions.hasOwnProperty(keyword);
    }
    isChannelSelected(keyword) {
        return this.props.selectedChannels.hasOwnProperty(keyword);
    }
    isPartnerSelected(keyword) {
        return this.props.selectedPartners.hasOwnProperty(keyword);
    }
    isLoadingNecessaryData() {
        return this.props.channels === null ||
            this.props.isChannelsLoading ||
            this.props.partners === null ||
            this.props.isPartnersLoading;
    }
    render() {
        return (
            <Row>
                {this.isLoadingNecessaryData() ? (
                    <Col>
                        Загрузка данных <Spinner size="sm" color="secondary"/>
                    </Col>
                ) : (
                    <Fragment>
                        {this.props.options.map((option, i) => {
                            if (option.group !== OPTION_GROUP_INTEGRATIONS) {
                                return (" ");
                            }
                            return (
                                <OrderCard key={i} type="checkbox"
                                           name="option" title={option.name}
                                           colNonActive={12} colActive={12}
                                           priceMin={option.priceMin} priceMax={option.priceMax}
                                           active={this.isOptionSelected(option.keyword)}
                                           value={option.keyword}
                                           onChange={this.handleOptionChange}>
                                    {(function () {
                                        switch (option.keyword) {
                                            case OPTION_COLLECT_LEADS:
                                                return (
                                                    <Fragment>
                                                        <Row>
                                                            {this.props.channels.map((channel, j) => {
                                                                return (
                                                                    <OrderCard key={"channel-" + i + "-" + j} type="checkbox"
                                                                               name="channel" title={channel.name}
                                                                               colNonActive={4} colActive={4}
                                                                               withoutPrice
                                                                               active={this.isChannelSelected(channel.keyword)}
                                                                               value={channel.keyword}
                                                                               onChange={this.handleChannelChange}/>
                                                                )
                                                            })}
                                                        </Row>
                                                    </Fragment>
                                                );
                                            case OPTION_SEND_LEADS_TO_PP:
                                                return (
                                                    <Fragment>
                                                        <Row>
                                                            {this.props.partners.map((partner, j) => {
                                                                return (
                                                                    <OrderCard key={"partner-" + i + "-" + j} type="checkbox"
                                                                               name="partner" title={partner.name}
                                                                               colNonActive={3} colActive={3}
                                                                               withoutPrice
                                                                               active={this.isPartnerSelected(partner.keyword)}
                                                                               value={partner.keyword}
                                                                               onChange={this.handlePartnerChange}/>
                                                                )
                                                            })}
                                                        </Row>
                                                    </Fragment>
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
        options: state.order.options,
        selectedOptions: state.order.selectedOptions,
        channels: state.order.channels,
        selectedChannels: state.order.selectedChannels,
        partners: state.order.partners,
        selectedPartners: state.order.selectedPartners,
        isChannelsLoading: state.order.isChannelsLoading,
        isPartnersLoading: state.order.isPartnersLoading,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    setOption,
    removeOption,
    setNotificationChannel,
    removeNotificationChannel,
    setIntegrationWithPp,
    removeIntegrationWithPp,
    fetchLandingNotificationChannels,
    fetchLandingIntegrationPartners,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderThirdStep);
