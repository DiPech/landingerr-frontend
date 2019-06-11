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
