import {
    OPTION_ADD_CLIENT_COUNTERS,
    OPTION_CLIENT_CHANGES,
    OPTION_EDIT_CONTACTS,
    OPTION_PLACEMENT_DEPLOY_TO_CLIENT_SERVER
} from "./constants";

export function getOptionDescription(options, keyword) {
    for (let i in options) {
        let option = options[i];
        if (option.keyword === keyword) {
            return option.description;
        }
    }
    return "";
}

export function isValidOptionValue(selectedOptions, keyword) {
    switch (keyword) {
        case OPTION_CLIENT_CHANGES:
        case OPTION_EDIT_CONTACTS:
        case OPTION_ADD_CLIENT_COUNTERS:
        case OPTION_PLACEMENT_DEPLOY_TO_CLIENT_SERVER:
            return selectedOptions.hasOwnProperty(keyword) &&
                selectedOptions[keyword].length !== 0;
        default:
            return true;
    }
}
