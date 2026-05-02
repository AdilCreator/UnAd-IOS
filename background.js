// On Installation: Set default values
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ globalEnabled: true, totalBlocked: 0, whitelist: [] });
    
    chrome.contextMenus.create({
        id: "blockElement",
        title: "UnAd-IOS: Block Element",
        contexts: ["all"]
    });
});

// Listen for the toggle change from popup.js
chrome.storage.onChanged.addListener((changes) => {
    if (changes.globalEnabled) {
        const isEnabled = changes.globalEnabled.newValue;
        
        // Dynamically enable/disable the Ruleset from manifest.json
        chrome.declarativeNetRequest.updateEnabledRulesets({
            [isEnabled ? "enableRulesetIds" : "disableRulesetIds"]: ["ruleset_1"]
        });
    }
});

// Context Menu Logic
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "blockElement") {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                if (window.lastRightClickedElement) {
                    window.lastRightClickedElement.style.setProperty('display', 'none', 'important');
                }
            }
        });
    }
});