chrome.runtime.onInstalled.addListener(function (details) {
    console.log(details);
    chrome.storage.sync.get(null, function (items) {
        if (JSON.stringify(items) === '{}') { // 初始加载扩展，存储为空，默认指定全部选中。
            items = {'bookmark': true, 'tab': true, 'lasttab': true};
            // 保存到storage
            chrome.storage.sync.set(items, function () {
                console.log("设置已更改！");
            });
        }
    });
});
/***********************************************************************************************************************
 **                                                                                                                   **
 **                                     关闭最后一个标签页时不关闭浏览器                                              **
 **                                                   start                                                           **
***********************************************************************************************************************/
chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
    chrome.storage.sync.get("lasttab", function (lasttab) {
        var isLast = lasttab["lasttab"];
        console.log("是否设置【关闭最后一个标签页时打开新的标签页】：" + isLast);
        if (isLast) {
            queryLasttab();
            if (removeInfo["isWindowClosing"] === false) {
                chrome.storage.sync.get(null, function (items) {
                    console.log("*************** done for done ***************");
                    // for (key in items) {
                    //     console.log(key + ": " +items[key]);
                    // }
                    console.log("What am I living for ?");
                    console.log("*************** done for done ***************");
                    chrome.storage.sync.get("lastTabId", function (item) {
                        var flag = false;
                        var lasttabId;
                        if (item.length !== 0) {
                            lasttabId = item["lastTabId"];
                        }else {
                            flag = true;
                        }
                        if (tabId === lasttabId || lasttabId === false) {
                            flag = true;
                        }

                        console.log("要关闭的标签页的ID是 " + tabId);
                        console.log("the lastTab id that in storage is " + lasttabId);
                        console.log("flag is " + flag);
                        if (flag) {
                            console.log("need to create new tab");
                            chrome.tabs.create({index: 0, active: true}, function (tab) {
                                console.log("created new tab！id is " + tab.id);
                                // console.log("create new tab！id is " + tab.id);
                                chrome.storage.sync.set({"lastTabId": tab.id}, function () {
                                    console.log("因创建新标签页而更改lastTabId！new value is " + tab.id);
                                });
                            });
                        }else {
                            console.log("this tab is not last");
                        }
                    });
                });
            } else {
                console.log("关闭浏览器！");
            }
        }
    });
});

function queryLasttab() {
    chrome.windows.getCurrent({populate: true}, function (currentWindow) {
        var res;
        if (currentWindow === undefined) {
            return;
        }else {
            var tabs = currentWindow["tabs"];

            if (tabs.length === 0) {
                res = false;
            }else {
                // console.log(tabs[0]);
                // console.log(tabs);
                var lasttab = tabs[0];
                console.log("the lastTab id that in current window is " + lasttab.id);
                res = lasttab.id;
            }
        }

        chrome.storage.sync.set({"lastTabId": res}, function () {
            console.log("lastTabId已更改！new value is " + res);
        });

    });
}
/***********************************************************************************************************************
 **                                                                                                                   **
 **                                                    end                                                            **
 **                                                                                                                   **
 **********************************************************************************************************************/

/***********************************************************************************************************************
 **                                                                                                                   **
 **                                              在新标签页中打开链接                                                 **
 **                                                     start                                                         **
 **********************************************************************************************************************/
// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//     console.log(message);
//     console.log(sender);
//     sendResponse({returnMessage: "I got u"});
// });
/***********************************************************************************************************************
 **                                                                                                                   **
 **                                                       end                                                         **
 **                                                                                                                   **
 **********************************************************************************************************************/

/***********************************************************************************************************************
 **                                                                                                                   **
 **                                              在新标签页中打开书签                                                 **
 **                                                     start                                                         **
 **********************************************************************************************************************/
// chrome.bookmarks.getChildren("1", function (results) {
//     results.forEach(function (bm) {
//
//         console.log(bm.title + "：" + bm.url);
//     });
//
// });
/***********************************************************************************************************************
 **                                                                                                                   **
 **                                                       end                                                         **
 **                                                                                                                   **
 **********************************************************************************************************************/

