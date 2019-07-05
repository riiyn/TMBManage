// lasttab();
chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
        var storageChange = changes[key];
        console.log('存储键“%s”（位于“%s”命名空间中）已更改。' +
            '原来的值为“%s”，新的值为“%s”。',
            key,
            namespace,
            storageChange.oldValue,
            storageChange.newValue);
    }
    console.log(changes);
});

function lasttab(){
    var lasttabId = queryLasttab();
    alert("lasttabId " + lasttabId);
    chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
        if (removeInfo["isWindowClosing"] === false) {
            if (tabId === lasttabId) {// 关闭的标签页是last tab
                createTab();
            }else {
                console.log("关闭的标签页不是last tab");
                alert("关闭的标签页不是last tab");
            }
        }
    });
}

function queryLasttab() {
    chrome.tabs.query({'index': 0, 'currentWindow': true}, function (tab) {
        return tab.id;
    });
}

function createTab() {
    chrome.tabs.create({'index': 0, 'active': true}, function (tab) {
        console.log("create new tab！id is " + tab.id);
        alert("create new tab！id is " + tab.id);
    });
}
