
window.onload = function()
{
    // 获得当前tab，执行
    getCurrentTabAndExec();
};

function getCurrentTabAndExec()
{
    chrome.tabs.executeScript( null, {file:"util/jquery.min.js"});
    chrome.tabs.executeScript( null, {file:"util/showdown.js"});
    chrome.tabs.executeScript( null, {file:"insert.js"});
}
