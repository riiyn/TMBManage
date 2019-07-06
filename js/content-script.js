// document.addEventListener('DOMContentLoaded', function () {
//     // google搜索----------》h3.LC20lb   a.fl
//     // 筛选href以【http】或【https】开头的<a>标签，排除URL以【https://www.baidu.com/s?】开头的页面
//     var urls = [];
//     $('a[href^="http://"]').click(function () {
//
//         urls.push($(this).attr("href"));
//         console.log(urls);
//         chrome.runtime.sendMessage({url: urls}, function (response) {
//             // alert(response["returnMessage"]);
//         });
//     });
//
// });