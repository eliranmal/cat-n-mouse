{
    const catSelectEl = document.getElementById('cat-name');
    const cursorSizeEl = document.getElementById('cursor-size');

    const urlParamsChangeHandler = (ev) => {
        if (ev.target) {
            chrome.storage.local.set({
                [ev.target.id]: ev.target.value,
            });
        }
    }

    // bind event listeners
    catSelectEl.addEventListener('change', urlParamsChangeHandler)
    cursorSizeEl.addEventListener('change', urlParamsChangeHandler)

    // populate initial values from storage
    chrome.storage.local.get({
        'cat-name': 'bella',
        'cursor-size': '120',
    }).then((data) => {
        catSelectEl.value = data['cat-name'];
        cursorSizeEl.value = data['cursor-size'];
    });
}
