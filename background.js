'use strict';

function assert(condition, message) {
    if (!condition) {
        message = message || "Assertion failed";
        if (typeof Error !== "undefined") {
            throw new Error(message);
        }
        throw message; // Fallback
    }
}

async function loadParserModule(id) {
    return import('/modules/parsers/' + id + '.js');
}

function matchTabCondition(tab, condition) {
    assert(condition.instanceType == "declarativeContent.PageStateMatcher");

    let url = new URL(tab.url)

    if (typeof condition.pageUrl !== 'undefined') {
        if (typeof condition.pageUrl.hostContains !== 'undefined') {
            if (!url.hostname.includes(condition.pageUrl.hostContains)) {
                return false;
            }
        }
        if (typeof condition.pageUrl.hostEquals !== 'undefined') {
            if (url.hostname != condition.pageUrl.hostEquals) {
                return false;
            }
        }
        if (typeof condition.pageUrl.hostPrefix !== 'undefined') {
            if (!url.hostname.startsWith(condition.pageUrl.hostPrefix)) {
                return false;
            }
        }
        if (typeof condition.pageUrl.hostSuffix !== 'undefined') {
            if (!url.hostname.endsWith(condition.pageUrl.hostSuffix)) {
                return false;
            }
        }

        if (typeof condition.pageUrl.pathContains !== 'undefined') {
            if (!url.pathname.includes(condition.pageUrl.pathContains)) {
                return false;
            }
        }
        if (typeof condition.pageUrl.pathEquals !== 'undefined') {
            if (url.pathname != condition.pageUrl.pathEquals) {
                return false;
            }
        }
        if (typeof condition.pageUrl.pathPrefix !== 'undefined') {
            if (!url.pathname.startsWith(condition.pageUrl.pathPrefix)) {
                return false;
            }
        }
        if (typeof condition.pageUrl.pathSuffix !== 'undefined') {
            if (!url.pathname.endsWith(condition.pageUrl.pathSuffix)) {
                return false;
            }
        }

        if (typeof condition.pageUrl.queryContains !== 'undefined') {
            if (!url.search.includes(condition.pageUrl.queryContains)) {
                return false;
            }
        }
        if (typeof condition.pageUrl.queryEquals !== 'undefined') {
            if (url.search != condition.pageUrl.queryEquals) {
                return false;
            }
        }
        if (typeof condition.pageUrl.queryPrefix !== 'undefined') {
            if (!url.search.startsWith(condition.pageUrl.queryPrefix)) {
                return false;
            }
        }
        if (typeof condition.pageUrl.querySuffix !== 'undefined') {
            if (!url.search.endsWith(condition.pageUrl.querySuffix)) {
                return false;
            }
        }

        if (typeof condition.pageUrl.urlContains !== 'undefined') {
            if (!url.href.includes(condition.pageUrl.urlContains)) {
                return false;
            }
        }
        if (typeof condition.pageUrl.urlEquals !== 'undefined') {
            if (url.href != condition.pageUrl.urlEquals) {
                return false;
            }
        }
        if (typeof condition.pageUrl.urlPrefix !== 'undefined') {
            if (!url.href.startsWith(condition.pageUrl.urlPrefix)) {
                return false;
            }
        }
        if (typeof condition.pageUrl.urlSuffix !== 'undefined') {
            if (!url.href.endsWith(condition.pageUrl.urlSuffix)) {
                return false;
            }
        }

        // TODO implement these
        assert(typeof condition.pageUrl.urlMatches === 'undefined',
            "Condition 'pageUrl.urlMatches' not yet implemented");
        assert(typeof condition.pageUrl.originAndPathMatches === 'undefined',
            "Condition 'pageUrl.originAndPathMatches' not yet implemented");
        assert(typeof condition.pageUrl.schemes === 'undefined',
            "Condition 'pageUrl.schemes' not yet implemented");
        assert(typeof condition.pageUrl.ports === 'undefined',
            "Condition 'pageUrl.ports' not yet implemented");
    }
    // TODO implement these
    assert(typeof condition.css === 'undefined' || condition.css.length <= 0,
        "Condition 'css' not yet implemented");
    assert(typeof condition.isBookmarked === 'undefined',
        "Condition 'isBookmarked' not yet implemented");

    return true;
}

chrome.runtime.onInstalled.addListener(async function() {
    let enabledParsers = [
        "ArsTechnica",
        "Bandcamp",
        "Discord",
        "ESPN",
        "FiveThirtyEight",
        "Flickr",
        "Gannett",
        "MajorLeagueSoccer",
        "NewYorkTimes",
        "SportsEngine",
        "Tumblr",
        "Twitter",
        "WashingtonPost",
        "Wikimedia",
        "YouTube",
    ];

    let rules = [];
    for (let parserId of enabledParsers) {
        let module = await loadParserModule(parserId);
        let parser = new module.default();
        let conditions = [];
        let conditionObjs = parser.getConditions();
        for (let condition of conditionObjs) {
            conditions.push(
                new chrome.declarativeContent.PageStateMatcher(condition)
            );
        }
        rules.push({
            id: parserId,
            conditions: conditions,
            actions: [new chrome.declarativeContent.ShowPageAction()]
        });
        console.log("Loaded conditions for " + parserId);
    }

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules(
            rules,
            function(rules) {
                console.log(rules);
                console.log("Declarative content rules registered")
            }
        );
    });
});

chrome.pageAction.onClicked.addListener(async function(tab) {
    chrome.declarativeContent.onPageChanged.getRules(undefined, console.log);

    await chrome.declarativeContent.onPageChanged.getRules(undefined, async function(rules) {
        let targetUrl = null;
        for (let rule of rules) {
            for (let condition of rule.conditions) {
                if (matchTabCondition(tab, condition)) {
                    console.log("Matched "+tab.url+" with "+rule.id+" parser")

                    // import the appropriate parser module
                    let module = await loadParserModule(rule.id);
                    let parser = new module.default();

                    // get the URL from the parser
                    targetUrl = parser.getBiggestUrl(new URL(tab.url));
                    if (targetUrl !== null) break;
                }
            }
            if (targetUrl !== null) break;
        }

        if (targetUrl !== null) {
            chrome.tabs.update(tab.id, { url: targetUrl });
        } else {
            alert("Sorry, no bigger version is available.");
        }

    });
});
