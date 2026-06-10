
const setCatUrl = (name = 'bella', size = '120') => {
  // `fit` must be `inside`, otherwise the cursor won't render at all
  // (because the image dimensions might exceed the cursor size the browser allows)
  const catUrl = `https://placecats.com/${name}/${size}/${size}/?fit=inside&position=top`;
  document.documentElement.style.setProperty('--cat-url', `url("${catUrl}")`);
}

const toggleCursor = () => {
  document.documentElement.classList.toggle('cat-cursor');
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.command === 'toggle-cursor') {
      toggleCursor();
  }
});

chrome.storage.local.onChanged.addListener(async (changes) => {
  const currentData = await chrome.storage.local.get();
  const catNameChange = changes['cat-name'];
  const cursorSizeChange = changes['cursor-size'];
  setCatUrl(
      catNameChange ? catNameChange.newValue : currentData['cat-name'],
      cursorSizeChange ? cursorSizeChange.newValue : currentData['cursor-size'],
  );
});

// populate initial values from storage
chrome.storage.local.get().then((data) => (
    setCatUrl(data['cat-name'], data['cursor-size'])
));

