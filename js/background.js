chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
    if (removeInfo["isWindowClosing"] === false) {
        chrome.tabs.get(tabId, function (tab) {
            if (tab.index === 0 && tab.active === true) {
                var createProperties = {'index': 0};
                chrome.tabs.create(createProperties, function (tab) {
                    alert("关闭最后一个标签页时创建了新的标签页，防止浏览器关闭！" + tab.id + "：" + tab.active);
                });
            } else {
                alert("当前标签页不是最后一个标签页！");
            }
        });
    }
});