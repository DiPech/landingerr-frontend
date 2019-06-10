import {SHOP_FETCH_LANDINGS_ERROR, SHOP_FETCH_LANDINGS_PENDING, SHOP_FETCH_LANDINGS_SUCCESS} from "./actions";

const defaultState = {
    isLoading: false,
    landings: [],
    errorMessage: null
};

export const shopReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SHOP_FETCH_LANDINGS_PENDING:
            return {...state,
                isLoading: true
            };
        case SHOP_FETCH_LANDINGS_SUCCESS:
            return {...state,
                isLoading: false,
                landings: action.payload
            };
        case SHOP_FETCH_LANDINGS_ERROR:
            return {...state,
                isLoading: false,
                errorMessage: action.payload
            };
        default:
            return state;
    }
};
