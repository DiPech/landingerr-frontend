import {
    OPTION_EDIT_ADD_CLIENT_COUNTERS,
    OPTION_EDIT_CLIENT_CHANGES,
    OPTION_EDIT_EDIT_CONTACTS,
    OPTION_PLACEMENT_DEPLOY_TO_CLIENT_SERVER, OPTION_PLACEMENT_DOWNLOAD_LANDING,
    OPTION_SOURCE_FROM_ARCHIVE,
    OPTION_SOURCE_FROM_SHOP,
    OPTION_SOURCE_FROM_URL
} from "./constants";
import {removeFromArrayByValue} from "../../util/array";
import {removeOption, setOption, setPlacement, setSource} from "../../store/order/actions";
import {store} from "../App";

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
        case OPTION_EDIT_CLIENT_CHANGES:
        case OPTION_EDIT_EDIT_CONTACTS:
        case OPTION_EDIT_ADD_CLIENT_COUNTERS:
        case OPTION_PLACEMENT_DEPLOY_TO_CLIENT_SERVER:
            return selectedOptions.hasOwnProperty(keyword) &&
                selectedOptions[keyword].length !== 0;
        default:
            return true;
    }
}

export function updateSource(optionKeyword) {
    let allOptions = [OPTION_SOURCE_FROM_URL, OPTION_SOURCE_FROM_SHOP, OPTION_SOURCE_FROM_ARCHIVE];
    store.dispatch(setSource(optionKeyword));
    store.dispatch(setOption(optionKeyword, ""));
    let notSelectedOptions = removeFromArrayByValue(allOptions, optionKeyword);
    for (let keyword of notSelectedOptions) {
        store.dispatch(removeOption(keyword));
    }
}

export function updatePlacement(optionKeyword) {
    let allOptions = [OPTION_PLACEMENT_DOWNLOAD_LANDING, OPTION_PLACEMENT_DEPLOY_TO_CLIENT_SERVER];
    store.dispatch(setPlacement(optionKeyword));
    store.dispatch(setOption(optionKeyword, ""));
    let notSelectedOptions = removeFromArrayByValue(allOptions, optionKeyword);
    for (let keyword of notSelectedOptions) {
        store.dispatch(removeOption(keyword));
    }
}
