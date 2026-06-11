

const increment = (num, ceil) => {
  const n = Number.parseInt(num, 10);
  return n % ceil + 1;
};

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
  return chrome.storage.local.set({
    'cat-name': nextCatName,
  });
};


chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'switch-cursor') {
    await rotateCursor();
  }

  if (['toggle-cursor', 'switch-cursor'].includes(command)) {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => (
      chrome.tabs.sendMessage(tabs[0].id, { command })
    ));
  }
});
