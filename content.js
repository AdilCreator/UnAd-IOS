document.addEventListener('contextmenu', e => { window.lastRightClickedElement = e.target; }, true);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleReadingMode") {
    if (document.getElementById('unad-zen-container')) {
      location.reload();
      return;
    }
    const article = document.querySelector('article') || document.querySelector('main') || document.body;
    const content = article.cloneNode(true);
    const noise = content.querySelectorAll('script, style, button, nav, footer, aside, .ad');
    noise.forEach(el => el.remove());

    const zenContainer = document.createElement('div');
    zenContainer.id = 'unad-zen-container';
    zenContainer.innerHTML = `
      <div class="zen-content">
        <button id="close-zen">✕ Close Zen Mode</button>
        ${content.innerHTML}
      </div>
    `;
    document.documentElement.appendChild(zenContainer);
    document.getElementById('close-zen').onclick = () => location.reload();
  }
});