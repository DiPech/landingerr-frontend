import {
    USER_CHANGE_NAME,
    USER_CHANGE_EMAIL,
    USER_CHANGE_PHONE
} from "./actions";

const defaultState = {
    name: "Дмитрий Печковский",
    email: 'dmitry.pechkovsky@gmail.com',
    phone: '+7 (903) 375-13-87'
};

export const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case USER_CHANGE_NAME:
            return {...state, name: action.payload};
        case USER_CHANGE_EMAIL:
            return {...state, email: action.payload};
        case USER_CHANGE_PHONE:
            return {...state, phone: action.payload};
        default:
            return state;
    }
};
