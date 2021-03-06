const BROWSER_DEFAULT_OPTIONS = {
    headless: false,
    slowMo: 0,
    timeout: 0,
    args: ['--start-maximized', '--window-size=1920,1040'] 
}

const DEFAULT_VIEWPORT = {
    width: 1920, 
    height: 1080
};

const ROOT_URL = "https://hipo-143c1.firebaseapp.com/";


const SEARCH_INPUT_TYPED_VALUE = "Istanbul";
const SEARCH_INPUT_CONCERT_VALUE = "Concert";

const SEARCH_INPUT_SELECTOR = "input[name=query]";
const SEARCH_BUTTON_NODE_SELECTOR = ".submit-button";
const WAIT_FOR_SELECTOR = "body";
const WARNING_MESSAGE_SELECTOR = ".alert.alert-warning";
const COLLECTION_SELECTBOX_SELECTOR = ".c-select-box";
const COLLECTION_SELECTBOX_DROPDOWN_SELECTOR = `${COLLECTION_SELECTBOX_SELECTOR} .drop-down`;
const COLLECTION_SELECTBOX_SELECTED_ITEM_SELECTOR = `${COLLECTION_SELECTBOX_SELECTOR} .selected-item--name`;
const COLLECTION_SELECTBOX_SELECTED_ITEM_TEXT_SELECTOR = `${COLLECTION_SELECTBOX_SELECTED_ITEM_SELECTOR} div.flex-fill`;
const COLLECTION_SELECTBOX_OPTIONS_SELECTOR =  `${COLLECTION_SELECTBOX_DROPDOWN_SELECTOR} .item--container`;
const SEARCH_FORM_SELECTOR = ".c-search-form";
const LOADING_INDICATOR_SELECTOR = ".loading-indicator.is-showing";


module.exports = {
    BROWSER_DEFAULT_OPTIONS,
    DEFAULT_VIEWPORT,
    ROOT_URL,
    WAIT_FOR_SELECTOR,
    SEARCH_INPUT_TYPED_VALUE,
    SEARCH_INPUT_SELECTOR,
    SEARCH_BUTTON_NODE_SELECTOR,
    WARNING_MESSAGE_SELECTOR,
    COLLECTION_SELECTBOX_SELECTOR,
    COLLECTION_SELECTBOX_DROPDOWN_SELECTOR,
    COLLECTION_SELECTBOX_SELECTED_ITEM_SELECTOR,
    COLLECTION_SELECTBOX_SELECTED_ITEM_TEXT_SELECTOR,
    COLLECTION_SELECTBOX_OPTIONS_SELECTOR,
    SEARCH_FORM_SELECTOR,
    SEARCH_INPUT_CONCERT_VALUE
}