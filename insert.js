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
    dialog.id = dlgID;
    /*组装对话框标题栏,按从里到外的顺序组装*/
    dialogtitle.innerHTML = title;
    dialogtitlebar.appendChild(dialogtitle);
    dialogtitlebar.appendChild(dialogclose);
    closeaction.innerHTML = "×";
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
    dialogcssText= "position:fixed;background:#65c294;z-index:1000;padding:1px;border:4px;top:100px;right:100px;height:"+height+"px;width:"+width+"px;";
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
        dialogright = parseInt(dialog.style.right);
        dialogtop = parseInt(dialog.style.top);
        dialogtitlebar.addEventListener("mousedown",function(e)
        {
            ismousedown = true;
            downX = e.clientX;
            downY = e.clientY;
        });
        document.addEventListener("mousemove", function(e)
        {
            if(ismousedown)
            {
                dialog.style.top = e.clientY - downY + dialogtop + "px";
                dialog.style.right = downX - e.clientX + dialogright + "px";
                console.log(e.clientX, downX, dialogright);
            }
        });
        /*松开鼠标时要重新计算当前窗口的位置*/
        document.addEventListener("mouseup", function()
        {
            dialogright = parseInt(dialog.style.right);
            dialogtop = parseInt(dialog.style.top);
            ismousedown = false;
        });
    }
}

// 创建悬浮对话框
function createHTML2MardDownDialog()
{
    // 各个元素
    var bodyContent = document.createElement('div');    // 对话框最外div
    bodyContent.id = 'HTML2MD_Dialog';
    {   // 工具栏
        var divToolBar = document.createElement('div');
        bodyContent.appendChild(divToolBar);
        var btnConv = document.createElement('input');      // HTML2MD按钮
        divToolBar.appendChild(btnConv);
        btnConv.type = "button";
        btnConv.value = "Run";
        btnConv.onclick = function()
        {
            var converter = new showdown.Converter();
            var text      = document.getElementById("MD2HTML_mdText").value;
            var html      = converter.makeHtml(text);
            document.getElementById("MD2HTML_HTMLFrame").srcdoc = html;
        };
    }
    {   // MarkDown编辑框
        var divMDdEditor = document.createElement('div');
        bodyContent.appendChild(divMDdEditor);
        divMDdEditor.style = "width: 50%; height: 500px; float: left; border: 1px solid #333; border-right: 0px; box-sizing: border-box;";
        var textmdEditor = document.createElement('textarea');
        divMDdEditor.appendChild(textmdEditor);
        textmdEditor.style = "width: 100%; height: 100%; border: 0px; padding: 5px; box-sizing: border-box;";
        textmdEditor.id = "MD2HTML_mdText";
    }
    { // html展示框
        var divHTMLDisp = document.createElement('div')
        bodyContent.appendChild(divHTMLDisp);
        divHTMLDisp.style="width: 50%; height: 500px; float: right; border: 1px solid #333; box-sizing: border-box;";
        var frameHTMLDisp = document.createElement('iframe');
        divHTMLDisp.appendChild(frameHTMLDisp);
        frameHTMLDisp.style="width: 100%; height: 100%; border: 0px; padding: 5px; box-sizing: border-box;";
        frameHTMLDisp.id = "MD2HTML_HTMLFrame";
    }
    // 创建对话框
    createdialog("Html2MD",400,400,bodyContent,"Html2MD",true);
    
}


// 选择文本对话框
function getSelected() 
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


// 选择文本之后的弹出对话框
function createSelectionContextDialog()
{
    var divTextSelectionMenu = document.createElement('div');
    document.body.appendChild(divTextSelectionMenu);
    divTextSelectionMenu.id = "menu";
    divTextSelectionMenu.style = 'display:none;z-index:1000;box-shadow: 0px 0px 4px rgba(0,0,0,.5);border: solid 1px #000;position: absolute;background: #fff;';
    {   // 工具栏
        var divToolBar = document.createElement('div');
        divTextSelectionMenu.appendChild(divToolBar);
        // 下拉选择框，选择各种Markdown样式
        var selMarkDownType = document.createElement('select');
        divToolBar.appendChild(selMarkDownType);
        selMarkDownType.style.display = "inline-block";
        selMarkDownType.id = "HTML2MD_TypeSelect"
        var optMarkDownTitle = document.createElement('option');
        selMarkDownType.appendChild(optMarkDownTitle);
        optMarkDownTitle.innerHTML = "title";
        var optMarkDownH1 = document.createElement('option');
        selMarkDownType.appendChild(optMarkDownH1);
        optMarkDownH1.innerHTML = "h1";
        var optMarkDownH2 = document.createElement('option');
        selMarkDownType.appendChild(optMarkDownH2);
        optMarkDownH2.innerHTML = "h2";
        var optMarkDownH3 = document.createElement('option');
        selMarkDownType.appendChild(optMarkDownH3);
        optMarkDownH3.innerHTML = "h3";
        var optMarkDownSource = document.createElement('option');
        selMarkDownType.appendChild(optMarkDownSource);
        optMarkDownSource.innerHTML = "src";
        var optMarkDownUl = document.createElement('option');
        selMarkDownType.appendChild(optMarkDownUl);
        optMarkDownUl.innerHTML = "ul";
        var optMarkDownOl = document.createElement('option');
        selMarkDownType.appendChild(optMarkDownOl);
        optMarkDownOl.innerHTML = "ol";
        // 生成MarkDown文本按钮
        var btnAddToMarkDown = document.createElement('input');
        divToolBar.appendChild(btnAddToMarkDown);
        btnAddToMarkDown.type = "button";
        btnAddToMarkDown.value = "MD";
        btnAddToMarkDown.onclick = function()
        {
            var addMarkDown = function(str)
            {
                var mdText = document.getElementById("MD2HTML_mdText");
                mdText.value += "\r\n";
                mdText.value += str;
            };
            var selection = document.getElementById("HTML2MD_TypeSelect");
            var text = document.getElementById("textEdit");
            if(selection.value == "h1")
            {
                addMarkDown("# " + text.value);
            }
            else if(selection.value == "h2")
            {
                addMarkDown("## " + text.value);
            }
            else if(selection.value == "h3")
            {
                addMarkDown("### " + text.value);
            }
            else if(selection.value == "title")
            {
                addMarkDown(text.value + "\r\n====================");
            }
            else if(selection.value == "src")
            {
                addMarkDown("```c++\r\n" + text.value + "\r\n```");
            }
            else if(selection.value == "ul")
            {
                addMarkDown("* " + text.value);
            }
            else if(selection.value == "ol")
            {
                addMarkDown("1. " + text.value);
            }
        };
    }
    {   // 文本编辑
        var textEdit = document.createElement('textarea');
        divTextSelectionMenu.appendChild(textEdit);
        textEdit.type = "text";
        textEdit.id = "textEdit";
    }
    
}

function HTML2MarkDownMain()
{
    createHTML2MardDownDialog();
    createSelectionContextDialog();
}

HTML2MarkDownMain();

$(document).on("mouseup", function(e) 
{
    var dialog = document.getElementById("Html2MD");
    var menu = document.getElementById("menu");
    var ele = document.elementFromPoint(e.clientX, e.clientY);
    if(!$.contains(dialog, ele) && (menu.style.display == "" || menu.style.display == "none"))
    {
        var selectedText = getSelected();
        if(selectedText != '')
        {
            var textEdit = document.getElementById('textEdit');
            textEdit.value = selectedText;
            menu.style.display = 'block';
            menu.style.left = e.pageX + 5 + "px";
            menu.style.top  = e.pageY + 5 + "px";
        }
    }
});


$(document).on("mousedown", function(e) 
{
    var menu = document.getElementById("menu");
    if(menu.style.display == "block")
    {
        var ele = document.elementFromPoint(e.clientX, e.clientY);
        if(!$.contains(menu, ele))
        {
            menu.style.display = 'none';
        }
    }
        
});
