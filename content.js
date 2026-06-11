
{
  const toggleCursor = () => (
    document.documentElement.classList.toggle('cat-cursor')
  );

  const buildImageUrls = (fileName) => {
    // same as referencing `__MSG_@@extension_id__` in CSS files
    const extensionId = chrome.i18n.getMessage('@@extension_id');
    // build two URLs for chromium/gecko-based browsers
    return ['chrome-extension', 'moz-extension']
        .map(protocol => (
            `url('${protocol}://${extensionId}/images/${fileName}.png')`)
        )
        .join(', ');
  };

  const renderCursor = (catName = 'cat-1') => {
    const cursorUrls = buildImageUrls(catName);
    document.documentElement.style.setProperty('--cursor-urls', cursorUrls);
  }


  // register event listeners

  chrome.runtime.onMessage.addListener((msg) => {
    switch (msg.command) {
      case 'toggle-cursor':
        toggleCursor();
        break;
      case 'switch-cursor':
        renderCursor(msg.newCatName);
        break;
      default:
        break;
    }
  });


  // populate initial values from storage

  chrome.storage.local.get({
    'cat-name': 'cat-1',
  }).then((data) => (
    renderCursor(data['cat-name'])
  ));
}
