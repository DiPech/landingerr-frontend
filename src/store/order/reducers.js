import {
    ORDER_CHANGE_SOURCE, ORDER_CHANGE_SOURCE_URL,
    ORDER_FETCH_LANDING_ERROR,
    ORDER_FETCH_LANDING_PENDING,
    ORDER_FETCH_LANDING_SUCCESS,
    ORDER_DESELECT_LANDING, ORDER_CHANGE_IS_ARCHIVE_ATTACHED
} from "./actions";

const defaultState = {
    source: null,
    sourceUrl: "",
    landingId: null,
    landing: null,
    isLandingLoading: false,
    isArchiveAttached: false,
};

export const orderReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ORDER_FETCH_LANDING_PENDING:
            return {...state,
                landingId: action.payload,
                isLandingLoading: true
            };
        case ORDER_FETCH_LANDING_SUCCESS:
            return {...state,
                isLandingLoading: false,
                landing: action.payload
            };
        case ORDER_FETCH_LANDING_ERROR:
            return {...state,
                landingId: null,
                landing: null,
                isLandingLoading: false
            };
        case ORDER_CHANGE_SOURCE:
            return {...state,
                source: action.payload
            };
        case ORDER_CHANGE_SOURCE_URL:
            return {...state,
                sourceUrl: action.payload
            };
        case ORDER_DESELECT_LANDING:
            return {...state,
                landingId: null,
                landing: null,
                isLandingLoading: false
            };
        case ORDER_CHANGE_IS_ARCHIVE_ATTACHED:
            return {...state,
                isArchiveAttached: action.payload
            };
        default:
            return state;
    }
};
