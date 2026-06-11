{
    const settingsFormEl = document.getElementById('popup-form');

    const saveSettingHandler = (ev) => {
        if (ev.target) {
            chrome.storage.local.set({
                [ev.target.name]: ev.target.value,
            });
        }
    }

    const selectCatRadio = (catName) => {
        settingsFormEl.querySelector(
            `input[name="cat-name"][value="${catName}"]`
        ).checked = true;
    }

    const loadCatNameSetting = () => (
        chrome.storage.local.get({
            'cat-name': 'cat-1',
        }).then((data) => (
            selectCatRadio(data['cat-name'])
        ))
    )

    // a nice trick to register one listener for all radio buttons;
    // attach a single listener to the form, and rely on individual
    // events bubbling from any nested radio buttons.
    const attachDelegatedRadioChangeHandler = (listener) => (
        settingsFormEl.addEventListener('change', (ev) => {
            if (ev.target?.matches('input[type="radio"]')) {
                listener(ev);
            }
        })
    )


    // bind event listeners
    attachDelegatedRadioChangeHandler(saveSettingHandler);

    // populate initial values from storage
    loadCatNameSetting();

    chrome.runtime.onMessage.addListener((msg) => {
        if (msg.command === 'switch-cursor') {
            selectCatRadio(msg.newCatName);
        }
    });
}
