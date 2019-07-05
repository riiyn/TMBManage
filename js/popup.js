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
        $('#' + id).change(function () {
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
        console.log(items);
    });
});


