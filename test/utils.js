const {
    COLLECTION_SELECTBOX_SELECTOR,
    COLLECTION_SELECTBOX_SELECTED_ITEM_TEXT_SELECTOR,
    COLLECTION_SELECTBOX_OPTIONS_SELECTOR,
    COLLECTION_SELECTBOX_DROPDOWN_SELECTOR,
    WARNING_MESSAGE_SELECTOR
} = require("./config");

async function collectionsSelectboxToggleAct(page) {
    return page.click(COLLECTION_SELECTBOX_SELECTOR);
}

async function getCollectionSelectboxValue(page) {
    return page.$eval(COLLECTION_SELECTBOX_SELECTED_ITEM_TEXT_SELECTOR, node => node.innerText);
}

async function getAndClickSelectboxElementAtFirst(page) {
    return await page.$eval(COLLECTION_SELECTBOX_OPTIONS_SELECTOR, async (item) => {
        await item.click();

        return Promise.resolve(item.innerText);
    });
}

async function isSelectboxToggled(page) {
    const collectionSelectionDropdownNode = await page.$(COLLECTION_SELECTBOX_DROPDOWN_SELECTOR);
    const collectionSelectionDropdownClasslist = await collectionSelectionDropdownNode.evaluate(node => Array.from(node.classList));

    return Promise.resolve(collectionSelectionDropdownClasslist.includes("toggled"));
}

async function isWarningMessageShowing(page) {
    const isShowing = !!(await page.$(WARNING_MESSAGE_SELECTOR));

    return Promise.resolve(isShowing);
}

async function reloadPage(page) {
    await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });

    return Promise.resolve();
}

async function clickToSelector(page, selector) {
    await page.evaluate((selector) => document.querySelector(selector).click(),[selector]);

    return Promise.resolve();
}

module.exports = {
    collectionsSelectboxToggleAct,
    getCollectionSelectboxValue,
    getAndClickSelectboxElementAtFirst,
    isSelectboxToggled,
    isWarningMessageShowing,
    reloadPage,
    clickToSelector
}