
chrome.commands.onCommand.addListener(command => {
  if (command === 'toggle-cursor') {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => (
      chrome.tabs.sendMessage(tabs[0].id, { command: 'toggle-cursor' })
    ));
  }
});
