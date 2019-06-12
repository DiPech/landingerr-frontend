export const ORDER_FETCH_LANDING_PENDING = 'ORDER_FETCH_LANDING_PENDING';
export const ORDER_FETCH_LANDING_SUCCESS = 'ORDER_FETCH_LANDING_SUCCESS';
export const ORDER_FETCH_LANDING_ERROR = 'ORDER_FETCH_LANDING_ERROR';
export const ORDER_CHANGE_SOURCE = 'ORDER_CHANGE_SOURCE';
export const ORDER_CHANGE_SOURCE_URL = 'ORDER_CHANGE_SOURCE_URL';
export const ORDER_DESELECT_LANDING = 'ORDER_DESELECT_LANDING';
export const ORDER_CHANGE_IS_ARCHIVE_ATTACHED = 'ORDER_CHANGE_IS_ARCHIVE_ATTACHED';
export const ORDER_FETCH_OPTIONS_SUCCESS = 'ORDER_FETCH_OPTIONS_SUCCESS';
export const ORDER_FETCH_OPTIONS_PENDING = 'ORDER_FETCH_OPTIONS_PENDING';
export const ORDER_FETCH_OPTIONS_ERROR = 'ORDER_FETCH_OPTIONS_ERROR';
export const ORDER_SET_OPTION = 'ORDER_SET_OPTION';
export const ORDER_REMOVE_OPTION = 'ORDER_REMOVE_OPTION';
export const ORDER_SET_NOTIFICATION_CHANNEL = 'ORDER_SET_NOTIFICATION_CHANNEL';
export const ORDER_REMOVE_NOTIFICATION_CHANNEL = 'ORDER_REMOVE_NOTIFICATION_CHANNEL';
export const ORDER_SET_INTEGRATION_WITH_PARTNER_PROGRAM = 'ORDER_SET_INTEGRATION_WITH_PARTNER_PROGRAM';
export const ORDER_REMOVE_INTEGRATION_WITH_PARTNER_PROGRAM = 'ORDER_REMOVE_INTEGRATION_WITH_PARTNER_PROGRAM';
export const ORDER_FETCH_NOTIFICATION_CHANNELS_PENDING = 'ORDER_FETCH_NOTIFICATION_CHANNELS_PENDING';
export const ORDER_FETCH_NOTIFICATION_CHANNELS_SUCCESS = 'ORDER_FETCH_NOTIFICATION_CHANNELS_SUCCESS';
export const ORDER_FETCH_NOTIFICATION_CHANNELS_ERROR = 'ORDER_FETCH_NOTIFICATION_CHANNELS_ERROR';
export const ORDER_FETCH_INTEGRATION_PARTNERS_PENDING = 'ORDER_FETCH_INTEGRATION_PARTNERS_PENDING';
export const ORDER_FETCH_INTEGRATION_PARTNERS_SUCCESS = 'ORDER_FETCH_INTEGRATION_PARTNERS_SUCCESS';
export const ORDER_FETCH_INTEGRATION_PARTNERS_ERROR = 'ORDER_FETCH_INTEGRATION_PARTNERS_ERROR';
export const ORDER_CHANGE_PLACEMENT = 'ORDER_CHANGE_PLACEMENT';

export const fetchLandingPending = (id) => ({
    type: ORDER_FETCH_LANDING_PENDING,
    payload: id
});
export const fetchLandingSuccess = (landing) => ({
    type: ORDER_FETCH_LANDING_SUCCESS,
    payload: landing
});
export const fetchLandingError = (message) => ({
    type: ORDER_FETCH_LANDING_ERROR,
    payload: message
});
export const setSource = (source) => ({
    type: ORDER_CHANGE_SOURCE,
    payload: source
});
export const setSourceUrl = (url) => ({
    type: ORDER_CHANGE_SOURCE_URL,
    payload: url
});
export const deselectLanding = () => ({
    type: ORDER_DESELECT_LANDING,
});
export const setArchiveAttached = (isAttached) => ({
    type: ORDER_CHANGE_IS_ARCHIVE_ATTACHED,
    payload: isAttached
});
export const fetchOptionsPending = () => ({
    type: ORDER_FETCH_OPTIONS_PENDING
});
export const fetchOptionsSuccess = (options) => ({
    type: ORDER_FETCH_OPTIONS_SUCCESS,
    payload: options
});
export const fetchOptionsError = (message) => ({
    type: ORDER_FETCH_OPTIONS_ERROR,
    payload: message
});
export const setOption = (keyword, data) => ({
    type: ORDER_SET_OPTION,
    payload: {keyword, data}
});
export const removeOption = (keyword) => ({
    type: ORDER_REMOVE_OPTION,
    payload: keyword
});
export const setNotificationChannel = (keyword) => ({
    type: ORDER_SET_NOTIFICATION_CHANNEL,
    payload: keyword
});
export const removeNotificationChannel = (keyword) => ({
    type: ORDER_REMOVE_NOTIFICATION_CHANNEL,
    payload: keyword
});
export const setIntegrationWithPp = (keyword) => ({
    type: ORDER_SET_INTEGRATION_WITH_PARTNER_PROGRAM,
    payload: keyword
});
export const removeIntegrationWithPp = (keyword) => ({
    type: ORDER_REMOVE_INTEGRATION_WITH_PARTNER_PROGRAM,
    payload: keyword
});
export const fetchNotificationChannelsPending = () => ({
    type: ORDER_FETCH_NOTIFICATION_CHANNELS_PENDING
});
export const fetchNotificationChannelsSuccess = (options) => ({
    type: ORDER_FETCH_NOTIFICATION_CHANNELS_SUCCESS,
    payload: options
});
export const fetchNotificationChannelsError = (message) => ({
    type: ORDER_FETCH_NOTIFICATION_CHANNELS_ERROR,
    payload: message
});
export const fetchIntegrationPartnersPending = () => ({
    type: ORDER_FETCH_INTEGRATION_PARTNERS_PENDING
});
export const fetchIntegrationPartnersSuccess = (options) => ({
    type: ORDER_FETCH_INTEGRATION_PARTNERS_SUCCESS,
    payload: options
});
export const fetchIntegrationPartnersError = (message) => ({
    type: ORDER_FETCH_INTEGRATION_PARTNERS_ERROR,
    payload: message
});
export const setPlacement = (placement) => ({
    type: ORDER_CHANGE_PLACEMENT,
    payload: placement
});
