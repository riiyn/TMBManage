function choose(element) {
    var name = element.getAttribute("name");
    var checked = $(element).prop("checked");

    if (name === "bookmark" && checked) {
        bookMark(name);
    } else if (name === "tab" && checked) {
        tab(name);
    } else if (name === "lasttab" && checked) {
        lastTab(name);
    }
}

function bookMark(element) {
    if (element === "bookmark") {
        // 在新标签页中打开书签
        alert("在新标签页中打开书签")
    }
    console.log("修改成功！")
    // alert("修改成功！")
}

function tab(element) {
    if (element === "tab") {
        // 在新标签页中打开链接
        alert("在新标签页中打开链接");
    }
}

function lastTab(element) {
    chrome.tabs.query({'currentWindow': true}, function (tabs) {
        if (tabs.length === 1) {
            if (tabs.index === 0 && tabs.active === true) {
                console.log("this is last tab" + tab.id);
                console.log("this tab is active：" + tab.index);
                console.log(tab);
            }else {
                console.log("当前标签页不是最后一个标签页！");
            }
        }else {
            console.log("当前窗口含有多个标签页！");
        }
    });
}

function saveSettings(data) {
    if (!data) {
        console.log("错误：没有指定值！");
        return
    }
    chrome.storage.sync.set(data, function () {
        console.log("设置已更改！");
    });

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
    });
}

var array = ['bookmark', 'tab', 'lasttab'];
$(document).ready(function () {
    array.forEach(function (id) {
        var obj = $('#' + id);
        obj.click(function () {
            choose(this);
            console.log(id + " set done");
        });
        obj.change(function () {
            var check = $('#' + id).prop("checked");
            var data = {};
            data[id] = check;
            saveSettings(data);
            console.log(id + " is " + check);
            // console.log(data);
        });
    });

    // chrome.storage.sync.clear(function () {
    //     console.log("clear all");
    // });

    chrome.storage.sync.get(null, function (items) {
        if (JSON.stringify(items) === '{}') { // 初始加载扩展，存储为空，默认指定全部选中。
            items = {'bookmark': true, 'tab': true, 'lasttab': true};
            // 保存到storage
            saveSettings(items);
        }
        for (key in items) {
            var storageArea = items[key];
            $("#" + key).prop("checked", storageArea);
        }
    });
});


