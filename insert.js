/**
关于一些参数说明：
*bodycontent:要在窗口显示的内容，dom对象
*title:窗口标题，字符串类型
*removeable:窗口能否拖动，布尔类型
*注意：内容窗体的高度是height-30px，请计算好你要显示的内容的高度和宽度。弹出窗的id为"223238909"，所以你的页面不要再取值为"223238909"的id了，以防js执行出错*/
function createdialog(dlgID,width,height,bodycontent,title,removeable)
{
    /*创建窗口的组成元素*/
    var dialog = document.createElement("div");
    document.body.appendChild(dialog);
    var dialogtitlebar= document.createElement("div");
    var dialogbody = document.createElement("div");
    var dialogtitle = document.createElement("span");
    var dialogclose = document.createElement("span");
    var closeaction = document.createElement("button");
    /*为窗口设置一个id，id如此怪异是为了尽量避免与其他用户取的id相同而出错*/
    dialog.id = dlgID;
    /*组装对话框标题栏,按从里到外的顺序组装*/
    dialogtitle.innerHTML = title;
    dialogtitlebar.appendChild(dialogtitle);
    dialogtitlebar.appendChild(dialogclose);
    closeaction.innerHTML = "╳";
    dialogclose.appendChild(closeaction);
    /*组装对话框主体内容*/
    if(bodycontent!=null)
    {
        bodycontent.style.display = "block";
        dialogbody.appendChild(bodycontent);
    }
    /*组装成完整的对话框*/
    dialog.appendChild(dialogtitlebar);
    dialog.appendChild(dialogbody);
    /*设置窗口组成元素的样式*/
    var templeft,temptop,tempheight//窗口的位置（将窗口放在页面中间的辅助变量）
    var dialogcssText,dialogbodycssText;//拼出dialog和dialogbody的样式字符串
    templeft = (document.body.clientWidth-width)/2;
    temptop = (document.body.clientHeight-height)/2;
    tempheight= height-30;
    dialogcssText= "position:absolute;background:#65c294;padding:1px;border:4px;top:"+temptop+"px;left:"+templeft+"px;height:"+height+"px;width:"+width+"px;";
    dialogbodycssText = "width:100%;background:#ffffff;"+"height:" + tempheight + "px;";
    dialog.style.cssText = dialogcssText;
    dialogtitlebar.style.cssText = "height:30px;width:100%;cursor:move;";
    dialogbody.style.cssText 	= dialogbodycssText;
    dialogclose.style.cssText 	= "float:right;display:block;margin:4px;line-height:20px;";
    closeaction.style.cssText	= "height:20px;width:24px;border-width:1px;cursor:pointer;";
    /*为窗口元素注册事件*/
    var dialogleft = parseInt(dialog.style.left);
    var dialogtop = parseInt(dialog.style.top);
    var ismousedown = false;//标志鼠标是否按下
    /*关闭按钮的事件*/							
    closeaction.onclick = function()
    {
        dialog.parentNode.removeChild(dialog);
    }
    /*实现窗口的移动，这段代码很典型，网上很多类似的代码*/
    if(removeable == true)
    {
        var ismousedown = false;
        var dialogleft,dialogtop;
        var downX,downY;
        dialogleft = parseInt(dialog.style.left);
        dialogtop = parseInt(dialog.style.top);
        dialogtitlebar.onmousedown = function(e)
        {
            ismousedown = true;
            downX = e.clientX;
            downY = e.clientY;
        }
        document.onmousemove = function(e)
        {
            if(ismousedown)
            {
                dialog.style.top = e.clientY - downY + dialogtop + "px";
                dialog.style.left = e.clientX - downX + dialogleft + "px";
            }
        }
        /*松开鼠标时要重新计算当前窗口的位置*/
        document.onmouseup = function()
        {
            dialogleft = parseInt(dialog.style.left);
            dialogtop = parseInt(dialog.style.top);
            ismousedown = false;
        }
    }
}


// 各个元素
var bodyContent = document.createElement('div');
var btnConv = document.createElement('input');
var divMDdEditor = document.createElement('div');
var textmdEditor = document.createElement('textarea');
var divHTMLDisp = document.createElement('div')
var frameHTMLDisp = document.createElement('iframe');
// 组装起来
bodyContent.appendChild(btnConv);
bodyContent.appendChild(divMDdEditor);
bodyContent.appendChild(divHTMLDisp);
divMDdEditor.appendChild(textmdEditor);
divHTMLDisp.appendChild(frameHTMLDisp);
// 各个元素配置
btnConv.type = "button";
btnConv.value = "Run";
btnConv.onclick = function()
{
    var converter = new showdown.Converter();
    var text      = document.getElementById("MD2HTML_mdText").value;
    var html      = converter.makeHtml(text);
    document.getElementById("MD2HTML_HTMLFrame").srcdoc = html;
};
divMDdEditor.style = "width: 50%; height: 500px; float: left; border: 1px solid #333; border-right: 0px; box-sizing: border-box;";
textmdEditor.style = "width: 100%; height: 100%; border: 0px; padding: 5px; box-sizing: border-box;";
textmdEditor.id = "MD2HTML_mdText";
divHTMLDisp.style="width: 50%; height: 500px; float: right; border: 1px solid #333; box-sizing: border-box;";
frameHTMLDisp.style="width: 100%; height: 100%; border: 0px; padding: 5px; box-sizing: border-box;";
frameHTMLDisp.id = "MD2HTML_HTMLFrame";
// 创建对话框
createdialog("Html2MD",400,400,bodyContent,"Html2MD",true);


// 选择文本对话框
var getSelected = function() 
{
    if (window.getSelection) 
    { //如果是Firefox、Chrome、Safari、Opera
        return window.getSelection().toString();
    } 
    else if (document.selection && document.selection.createRange) 
    { //如果是IE 
        return copytext_keleyi_com = document.selection.createRange().text;
    }
    return '';
}

var divTextSelectionMenu = document.createElement('div');
var textTest = document.createElement('input');
document.body.appendChild(divTextSelectionMenu);
divTextSelectionMenu.appendChild(textTest);
divTextSelectionMenu.id = "menu";
divTextSelectionMenu.style = 'display:none;box-shadow: 0px 0px 4px rgba(0,0,0,.5);border: solid 1px #000;position: absolute;background: #fff;';
textTest.type = "text";
textTest.id = "textTest";

$(document).on("mouseup", function(e) 
{
    var menu = document.getElementById("menu");
    if(menu.style.display == "" || menu.style.display == "none")
    {
        var selectedText = getSelected();
        if(selectedText != '')
        {
            var textTest = document.getElementById('textTest');
            textTest.value = selectedText;
            menu.style.display = 'block';
            menu.style.left = e.pageX + 5;
            menu.style.top  = e.pageY + 5;
        }
    }
    else
    {
        var rect = menu.getBoundingClientRect();
        if(e.pageX < rect.left || rect.right < e.pageX || e.pageY < rect.top || rect.bottom < e.pageY )
        {
            menu.style.display = 'none';
        }
    }
        
});
