const puppeteer = require("puppeteer");
const {expect} = require("chai");

const {
    BROWSER_DEFAULT_OPTIONS,
    ROOT_URL,
    WAIT_FOR_SELECTOR,
    SEARCH_INPUT_SELECTOR,
    SEARCH_INPUT_TYPED_VALUE,
    SEARCH_BUTTON_NODE_SELECTOR,
    COLLECTION_SELECTBOX_SELECTOR,
    COLLECTION_SELECTBOX_SELECTED_ITEM_SELECTOR,
    COLLECTION_SELECTBOX_OPTIONS_SELECTOR,
    SEARCH_INPUT_CONCERT_VALUE,
    SEARCH_FORM_SELECTOR,
    LOADING_INDICATOR_SELECTOR
} = require("./config");

let {
    collectionsSelectboxToggleAct,
    getCollectionSelectboxValue,
    getAndClickSelectboxElementAtFirst,
    isSelectboxToggled,
    isWarningMessageShowing,
    reloadPage,
    clickToSelector
} = require("./utils");


describe("Browser Tests", function() {
    let browser;

    before(async function(){
        browser = await puppeteer.launch(BROWSER_DEFAULT_OPTIONS);
    });

    after(async function() {
        await browser.close();
    });


    describe("Home page #home", function() {
        let page;
    
        before(async function() {
            function bindPageToUtilFunctions() {
                collectionsSelectboxToggleAct = collectionsSelectboxToggleAct.bind(null, page);
                getCollectionSelectboxValue = getCollectionSelectboxValue.bind(null, page);
                getAndClickSelectboxElementAtFirst = getAndClickSelectboxElementAtFirst.bind(null, page);
                isSelectboxToggled = isSelectboxToggled.bind(null, page);
                isWarningMessageShowing = isWarningMessageShowing.bind(null, page);
                reloadPage = reloadPage.bind(null, page);
                clickToSelector = clickToSelector.bind(null, page);
            }

            page = await browser.newPage();
    
            await page.goto(ROOT_URL);
            await page.waitFor(WAIT_FOR_SELECTOR);

            bindPageToUtilFunctions();
        });
    
        after(async function () {
          await page.close();
        });
    
        describe("General Tests", function(){
            it("Background color should have .bg-black-pearl class in homepage", async function() {
                const bodyClassList = await page.evaluate(() => {
                    const body = document.querySelector("body");
                    const classList = Array.from(body.classList);
        
                    return Promise.resolve(classList);
                });
        
                expect(bodyClassList).to.be.include("bg-black-pearl");
            });   
        });
    
        describe("Logo Tests", function() {
            let logoDOMNode;
    
            before(async function() {
                logoDOMNode = await page.$(".logo");
            });
    
            it("Logo should be represent in DOM", function() {
                expect(logoDOMNode).not.to.be.null;
            });
    
            it("Logo should have src attribute with './images/Logo.png'", async function() {
                const expectedSrc = "./images/Logo.png";
    
                const logoDOMNodeSrcAttr = await logoDOMNode.evaluate(node => node.getAttribute("src"));
    
                expect(logoDOMNodeSrcAttr).to.be.equal(expectedSrc);
            });
        });
    
        describe("Search Form Properties", function() {
            describe("Search Input Test", async function() {
                let searchInputDOMNode;
    
                before(async function() {
                    searchInputDOMNode = await page.$(SEARCH_INPUT_SELECTOR);
                });

                after(async function() {
                    await searchInputDOMNode.evaluate(node => node.value = "");
                });
    
                it("Search input should be exist", function() {
                    expect(searchInputDOMNode).not.to.be.null;
                });
    
                it("Search input should have a placeholder with 'Type here'", async function() {
                    const searchInputDOMNodePlaceholderAttr = await searchInputDOMNode.evaluate(node => node.getAttribute("placeholder"));
    
                    expect(searchInputDOMNodePlaceholderAttr).to.be.equal("Type here");
                });
    
                it("We can change input's value attribute with typing", async function() {
                    await page.type(SEARCH_INPUT_SELECTOR, SEARCH_INPUT_TYPED_VALUE);
                    const searchInputDOMNodeValueAttr = await searchInputDOMNode.evaluate(node => node.value);
    
                    expect(searchInputDOMNodeValueAttr).to.be.equal(SEARCH_INPUT_TYPED_VALUE);
                });
            });

            describe("Collections selectbox test", async function() {
                let collectionsSelectboxDOMNode;

                before(async function() {
                    collectionsSelectboxDOMNode = await page.$(COLLECTION_SELECTBOX_SELECTOR);
                });
                
                it("Collections selectbox should be exist", function() {
                    expect(collectionsSelectboxDOMNode).not.to.be.null;
                });

                describe("Collections selectbox placeholder", function() { 
                    it("Collection selectbox should have placeholder with 'Collections'", async function() {
                        expect(await getCollectionSelectboxValue()).to.be.equal("Collections");
                    });

                    it("Collection selectbox selected value should have 'is-placeholder' class with placeholder", async function() {
                        const selectedValueClasslist = await page.$eval(COLLECTION_SELECTBOX_SELECTED_ITEM_SELECTOR, node => Array.from(node.classList));

                        expect(selectedValueClasslist).to.be.include("is-placeholder");
                    });
                });

                describe("Collection selectbox other tests", () => {
                    it("Collections selectbox should toggle with click", async function() {
                        const situtationOne = await isSelectboxToggled();
    
                        await collectionsSelectboxToggleAct();
                        //await page.waitFor(500);
    
                        const situtationTwo = await isSelectboxToggled();
    
                        expect(situtationOne).to.be.false;
                        expect(situtationTwo).to.be.true;
                    });
    
                    it("Collection selectbox items to should represent", async function() {
                        const availableSelecboxItemsFixtures = [
                            "Concert and Performance",
                            "Northern Europe",
                            "Europe",
                            "Turkey",
                            "Party / Concerts"
                        ];
                        
                        const selectedboxItems = await page.$$eval(COLLECTION_SELECTBOX_OPTIONS_SELECTOR, items => items.map(item => item.innerText));
    
                        expect(selectedboxItems).to.have.members(availableSelecboxItemsFixtures);
                    });
    
                    it("Collection selectbox value should be change with click items", async function() {
                        expect(await getAndClickSelectboxElementAtFirst()).to.be.equal(await getCollectionSelectboxValue());
                    });
    
                    it("The dropdown menu should hide after the click item", async function() {
                        await collectionsSelectboxToggleAct();
                        await getAndClickSelectboxElementAtFirst();
    
                        expect(await isSelectboxToggled()).to.be.false;
                    });
                });
            });
        });

        describe("Intergration test #integration. Test full of functionality of home-page", function() {
            
            before(async function() {
                await reloadPage();    
            });

            this.afterEach(async function() {
                await reloadPage();
            });

            it("Immediately Clicking to Search button should show warning message",async function() {
                await page.click(SEARCH_BUTTON_NODE_SELECTOR);
                
                expect(await isWarningMessageShowing()).to.be.true;
            });

            it("Click search button when search input is typed and collection selectbox is default should show warning message.", async function() {
                await page.type(SEARCH_INPUT_SELECTOR, SEARCH_INPUT_TYPED_VALUE);
                await clickToSelector(SEARCH_BUTTON_NODE_SELECTOR);

                expect(await isWarningMessageShowing()).to.be.true;
            });

            it("Click search button when search input is default and collection selection is selected should show warning message", async function() {
                await getAndClickSelectboxElementAtFirst();
                await clickToSelector(SEARCH_BUTTON_NODE_SELECTOR);

                expect(await isWarningMessageShowing()).to.be.true;
            });

            describe("Check form whole functionality", function() {
                beforeEach(async function() {
                    await page.type(SEARCH_INPUT_SELECTOR, SEARCH_INPUT_CONCERT_VALUE);
                    await getAndClickSelectboxElementAtFirst();
                });

                describe("Clicking the submit button", async function() {
                    it("Loading indicator should show in the page", async function() {
                        before(async function() {
                            await page.setOfflineMode(true);
                            await clickToSelector(SEARCH_BUTTON_NODE_SELECTOR);
                        });

                        after(async function() {
                            await page.setOfflineMode(false);
                            await reloadPage();
                        });

                        const loadingIndicatorNode = page.$(LOADING_INDICATOR_SELECTOR);

                        expect(loadingIndicatorNode).not.to.be.null;
                    });

                    describe("The user should redirect after clicking to submit button", async function() {
                        let location;

                        this.retries(3);

                        before(async function() {
                            await page.type(SEARCH_INPUT_SELECTOR, SEARCH_INPUT_CONCERT_VALUE);
                            await getAndClickSelectboxElementAtFirst();
                            await clickToSelector(SEARCH_BUTTON_NODE_SELECTOR);
                            await page.waitForNavigation();

                            location = await page.evaluate(() => window.location);
                        });

                        it("Redirect path should be '/search'", async function() {
                            const {pathname} = location;
                            
                            expect(pathname).to.be.equal("/search");
                        });

                        it("The form properties should carry to redirected URL Search Parameters.", async function() {
                            const expectationSearchParams = {
                                query: "Concert", 
                                collections: "785618"
                            };

                            const searchParams = await page.evaluate(function() {
                                const locationSearch = window.location.search;
                                const urlSearchParams = new URLSearchParams(locationSearch);

                                return Object.fromEntries(urlSearchParams.entries());
                            });

                            expect(searchParams).to.deep.equal(expectationSearchParams);
                        });
                    });
                });
            });
        });
    });
});