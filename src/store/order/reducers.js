import {
    ORDER_CHANGE_IS_ARCHIVE_ATTACHED,
    ORDER_CHANGE_PLACEMENT,
    ORDER_CHANGE_SOURCE,
    ORDER_CHANGE_SOURCE_URL,
    ORDER_DESELECT_LANDING,
    ORDER_FETCH_INTEGRATION_PARTNERS_ERROR,
    ORDER_FETCH_INTEGRATION_PARTNERS_PENDING,
    ORDER_FETCH_INTEGRATION_PARTNERS_SUCCESS,
    ORDER_FETCH_LANDING_ERROR,
    ORDER_FETCH_LANDING_PENDING,
    ORDER_FETCH_LANDING_SUCCESS,
    ORDER_FETCH_NOTIFICATION_CHANNELS_ERROR,
    ORDER_FETCH_NOTIFICATION_CHANNELS_PENDING,
    ORDER_FETCH_NOTIFICATION_CHANNELS_SUCCESS,
    ORDER_FETCH_OPTIONS_ERROR,
    ORDER_FETCH_OPTIONS_PENDING,
    ORDER_FETCH_OPTIONS_SUCCESS,
    ORDER_REMOVE_INTEGRATION_WITH_PARTNER_PROGRAM,
    ORDER_REMOVE_NOTIFICATION_CHANNEL,
    ORDER_REMOVE_OPTION,
    ORDER_SET_INTEGRATION_WITH_PARTNER_PROGRAM,
    ORDER_SET_NOTIFICATION_CHANNEL,
    ORDER_SET_OPTION
} from "./actions";

const defaultState = {
    source: null,
    sourceUrl: "",
    landingId: null,
    landing: null,
    isLandingLoading: false,
    isArchiveAttached: false,
    isOptionsLoading: false,
    options: null,
    selectedOptions: {},
    isChannelsLoading: false,
    channels: null,
    selectedChannels: {},
    isPartnersLoading: false,
    partners: null,
    selectedPartners: {},
    placement: null
};

export const orderReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ORDER_FETCH_LANDING_PENDING:
            return {
                ...state,
                landingId: action.payload,
                isLandingLoading: true
            };
        case ORDER_FETCH_LANDING_SUCCESS:
            return {
                ...state,
                isLandingLoading: false,
                landing: action.payload
            };
        case ORDER_FETCH_LANDING_ERROR:
            return {
                ...state,
                landingId: null,
                landing: null,
                isLandingLoading: false
            };
        case ORDER_CHANGE_SOURCE:
            return {
                ...state,
                source: action.payload
            };
        case ORDER_CHANGE_SOURCE_URL:
            return {
                ...state,
                sourceUrl: action.payload
            };
        case ORDER_DESELECT_LANDING:
            return {
                ...state,
                landingId: null,
                landing: null,
                isLandingLoading: false
            };
        case ORDER_CHANGE_IS_ARCHIVE_ATTACHED:
            return {
                ...state,
                isArchiveAttached: action.payload
            };
        case ORDER_FETCH_OPTIONS_PENDING:
            return {
                ...state,
                isOptionsLoading: true
            };
        case ORDER_FETCH_OPTIONS_SUCCESS:
            return {
                ...state,
                isOptionsLoading: false,
                options: action.payload
            };
        case ORDER_FETCH_OPTIONS_ERROR:
            return {
                ...state,
                isOptionsLoading: false,
                options: null
            };
        case ORDER_SET_OPTION:
            let soSet = state.selectedOptions;
            soSet[action.payload.keyword] = action.payload.data;
            return {
                ...state,
                selectedOptions: soSet
            };
        case ORDER_REMOVE_OPTION:
            let soRemove = state.selectedOptions;
            delete soRemove[action.payload];
            return {
                ...state,
                selectedOptions: soRemove
            };
        case ORDER_SET_NOTIFICATION_CHANNEL:
            let sncSet = state.selectedChannels;
            sncSet[action.payload] = true;
            return {
                ...state,
                selectedChannels: sncSet
            };
        case ORDER_REMOVE_NOTIFICATION_CHANNEL:
            let sncRemove = state.selectedChannels;
            delete sncRemove[action.payload];
            return {
                ...state,
                selectedChannels: sncRemove
            };
        case ORDER_SET_INTEGRATION_WITH_PARTNER_PROGRAM:
            let spSet = state.selectedPartners;
            spSet[action.payload] = true;
            return {
                ...state,
                selectedPartners: spSet
            };
        case ORDER_REMOVE_INTEGRATION_WITH_PARTNER_PROGRAM:
            let spRemove = state.selectedPartners;
            delete spRemove[action.payload];
            return {
                ...state,
                selectedPartners: spRemove
            };
        case ORDER_FETCH_NOTIFICATION_CHANNELS_PENDING:
            return {
                ...state,
                isChannelsLoading: true
            };
        case ORDER_FETCH_NOTIFICATION_CHANNELS_SUCCESS:
            return {
                ...state,
                isChannelsLoading: false,
                channels: action.payload
            };
        case ORDER_FETCH_NOTIFICATION_CHANNELS_ERROR:
            return {
                ...state,
                isChannelsLoading: false,
                channels: null
            };
        case ORDER_FETCH_INTEGRATION_PARTNERS_PENDING:
            return {
                ...state,
                isPartnersLoading: true
            };
        case ORDER_FETCH_INTEGRATION_PARTNERS_SUCCESS:
            return {
                ...state,
                isPartnersLoading: false,
                partners: action.payload
            };
        case ORDER_FETCH_INTEGRATION_PARTNERS_ERROR:
            return {
                ...state,
                isPartnersLoading: false,
                partners: null
            };
        case ORDER_CHANGE_PLACEMENT:
            return {
                ...state,
                placement: action.payload
            };
        default:
            return state;
    }
};
