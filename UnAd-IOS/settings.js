const siteInput = document.getElementById('siteInput');
const addBtn = document.getElementById('addBtn');
const whitelistUl = document.getElementById('whitelist');

function updateList() {
    chrome.storage.local.get(['whitelist'], (data) => {
        whitelistUl.innerHTML = '';
        (data.whitelist || []).forEach(site => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${site}</span><span class="remove" data-site="${site}">X</span>`;
            whitelistUl.appendChild(li);
        });
    });
}

addBtn.onclick = () => {
    const site = siteInput.value.trim().toLowerCase();
    if(site) {
        chrome.storage.local.get(['whitelist'], (data) => {
            const list = data.whitelist || [];
            if(!list.includes(site)) {
                list.push(site);
                chrome.storage.local.set({ whitelist: list }, updateList);
                siteInput.value = '';
            }
        });
    }
};

whitelistUl.onclick = (e) => {
    if(e.target.classList.contains('remove')) {
        const site = e.target.dataset.site;
        chrome.storage.local.get(['whitelist'], (data) => {
            const list = data.whitelist.filter(s => s !== site);
            chrome.storage.local.set({ whitelist: list }, updateList);
        });
    }
};

document.getElementById('githubLink').onclick = (e) => {
    e.preventDefault();
    chrome.tabs.create({ url: 'https://github.com/AdilCreator/UnAd-IOS/' });
};

updateList();
