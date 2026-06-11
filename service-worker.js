

const increment = (num, ceil) => {
  const n = Number.parseInt(num, 10);
  return n % ceil + 1;
};

// cat names are the names of the cat image files,
// they're in the form `cat-1`, `cat-2`, etc.
// this function increments their number suffix.
const rotateCatName = (name) => (
    name.replace(/-(\d+)$/, (_, strIndex) => (
        `-${increment(strIndex, 25)}`)
    )
)

const rotateCursor = async () => {
  const currentData = await chrome.storage.local.get({
    'cat-name': 'cat-1',
  });
  const nextCatName = rotateCatName(currentData['cat-name']);
  await chrome.storage.local.set({
    'cat-name': nextCatName,
  });
  return nextCatName;
};

const notifyActiveTab = (data) => {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    // when popup is open, tabs[0] is undefined
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, data);
    }
  });
}

chrome.commands.onCommand.addListener(async (command) => {
  switch (command) {
    case 'toggle-cursor':
      // only active tab needs to know about cursor toggle; use tabs API
      notifyActiveTab({ command });
      break;
    case 'switch-cursor':
      const newCatName = await rotateCursor();
      // both popup and content script need to know about
      // cursor switch; use runtime and tabs APIs, respectively
      chrome.runtime.sendMessage({ command, newCatName });
      notifyActiveTab({ command, newCatName });
      break;
    default:
      break;
  }
});
