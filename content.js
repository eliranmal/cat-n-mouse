
{
  // todo - allow customizing cat url
  const catUrl = 'https://placecats.com/bella/120/120?fit=outside&position=top';
  document.documentElement.style.setProperty('--cat-url', `url("${catUrl}")`);
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.command === "cursor-toggle") {
    document.documentElement.classList.toggle('cat-cursor');
  }
});