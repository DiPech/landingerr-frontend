export const USER_CHANGE_NAME = 'USER_CHANGE_NAME';
export const USER_CHANGE_EMAIL = 'USER_CHANGE_EMAIL';
export const USER_CHANGE_PHONE = 'USER_CHANGE_PHONE';

export const setName = (name) => ({
    type: USER_CHANGE_NAME,
    payload: name
});
export const setEmail = (email) => ({
    type: USER_CHANGE_EMAIL,
    payload: email
});
export const setPhone = (phone) => ({
    type: USER_CHANGE_PHONE,
    payload: phone
});
