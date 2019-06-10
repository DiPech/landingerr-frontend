export const SHOP_FETCH_LANDINGS_PENDING = 'SHOP_FETCH_LANDINGS_PENDING';
export const SHOP_FETCH_LANDINGS_SUCCESS = 'SHOP_FETCH_LANDINGS_SUCCESS';
export const SHOP_FETCH_LANDINGS_ERROR = 'SHOP_FETCH_LANDINGS_ERROR';

export const fetchLandingsPending = () => ({
    type: SHOP_FETCH_LANDINGS_PENDING
});
export const fetchLandingsSuccess = (landings) => ({
    type: SHOP_FETCH_LANDINGS_SUCCESS,
    payload: landings
});
export const fetchLandingsError = (message) => ({
    type: SHOP_FETCH_LANDINGS_ERROR,
    payload: message
});
