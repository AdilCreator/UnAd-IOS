const globalToggle = document.getElementById('globalToggle');
const aiCore = document.getElementById('aiCore');

// 1. Sync toggle UI with saved storage
chrome.storage.local.get(['globalEnabled', 'totalBlocked'], (data) => {
    const isEnabled = data.globalEnabled !== false;
    globalToggle.checked = isEnabled;
    aiCore.style.filter = isEnabled ? 'none' : 'grayscale(1) opacity(0.3)';
    document.getElementById('blockedCount').innerText = data.totalBlocked || 0;
});

// 2. Handle Toggle Change
globalToggle.onchange = () => {
    const isEnabled = globalToggle.checked;
    chrome.storage.local.set({ globalEnabled: isEnabled });
    
    // UI Feedback: Dim the core when disabled
    aiCore.style.filter = isEnabled ? 'none' : 'grayscale(1) opacity(0.3)';
    
    // Refresh the current tab to apply change
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs[0] && !tabs[0].url.startsWith("chrome://")) {
            chrome.tabs.reload(tabs[0].id);
        }
    });
};

// 3. Button Actions
document.getElementById('zenBtn').onclick = async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    try {
        await chrome.tabs.sendMessage(tab.id, { action: "toggleReadingMode" });
    } catch (e) { chrome.tabs.reload(tab.id); }
};

document.getElementById('settingsBtn').onclick = () => chrome.runtime.openOptionsPage();