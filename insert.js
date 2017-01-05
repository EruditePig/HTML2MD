/**
关于一些参数说明：
*bodycontent:要在窗口显示的内容，dom对象
*title:窗口标题，字符串类型
*removeable:窗口能否拖动，布尔类型
*注意：内容窗体的高度是height-30px，请计算好你要显示的内容的高度和宽度。弹出窗的id为"223238909"，所以你的页面不要再取值为"223238909"的id了，以防js执行出错*/
function createdialog(dlgID,width,height,bodycontent,title,removeable)
{
    // 一些控制变量
    var edgeWidth = 5;
    var titleHeight = 20;
    var edgeZIndex = 3;
    var dragObj = {"state":false, "timerId":0, "nowPt":{}, "para":{}};
    
    // 最外围的div
    var dialog = document.createElement("div");
    document.body.appendChild(dialog);
    dialog.id = dlgID;
    dialog.style.position = "fixed";
    //dialog.style.background = "blue";
    //dialog.style.padding = "1px";
    dialog.style.border = "4px";
    dialog.style.top = (window.innerHeight-height)/2 + "px";
    dialog.style.left = (window.innerWidth-width)/2 + "px";
    dialog.style.height = height+"px";
    dialog.style.width = width+"px";
    
    // 边框拖拽响应函数
    document.addEventListener("mouseup", function(e)
    {
        dragObj.state = false;
        clearInterval(dragObj.timerId);
    });
    document.addEventListener("mousemove", function(e)
    {
        if(dragObj.state == true)
        {
            dragObj.nowPt = {"x":e.clientX, "y":e.clientY};
        }
    });
    // 上边框
    var topEdge = document.createElement("div");
    dialog.appendChild(topEdge);
    topEdge.style.position = "absolute";
    topEdge.style.height = edgeWidth + "px";
    topEdge.style.width = "100%";
    topEdge.style.top = "0px";
    // topEdge.style.background = "red";
    topEdge.style.zIndex = edgeZIndex;
    topEdge.addEventListener("mousedown", function(e)
    {
        dragObj.state = true;
        dragObj.para = {"top":parseInt(dialog.style.top), "height":parseInt(dialog.style.height), "y" : e.clientY};
        dragObj.timerId = setInterval(function()
        {
            if(dragObj.state = true)
            {
                dialog.style.top = dragObj.nowPt.y - dragObj.para.y + dragObj.para.top + "px";
                dialog.style.height = dragObj.para.height - (dragObj.nowPt.y - dragObj.para.y) + "px";
            }
        }, 10);
        
    });
    topEdge.addEventListener("mouseover", function(e)
    {
        topEdge.style.cursor = "n-resize";
    });
    // 左边框
    var leftEdge = document.createElement("div");
    dialog.appendChild(leftEdge);
    leftEdge.style.position = "absolute";
    leftEdge.style.height = "100%";
    leftEdge.style.width = edgeWidth + "px";
    leftEdge.style.left = "0px";
    // leftEdge.style.background = "black";
    leftEdge.style.zIndex = edgeZIndex;
    leftEdge.addEventListener("mousedown", function(e)
    {
        dragObj.state = true;
        dragObj.para = {"left":parseInt(dialog.style.left), "width":parseInt(dialog.style.width), "x" : e.clientX};
        dragObj.timerId = setInterval(function()
        {
            if(dragObj.state = true)
            {
                dialog.style.left = dragObj.nowPt.x - dragObj.para.x + dragObj.para.left + "px";
                dialog.style.width = dragObj.para.width - (dragObj.nowPt.x - dragObj.para.x) + "px";
            }
        }, 10);
        
    });
    leftEdge.addEventListener("mouseover", function(e)
    {
        leftEdge.style.cursor = "e-resize";
    });
    // 右边框
    var rightEdge = document.createElement("div");
    dialog.appendChild(rightEdge);
    rightEdge.style.position = "absolute";
    rightEdge.style.height = "100%";
    rightEdge.style.width = edgeWidth + "px";
    rightEdge.style.right = "0px";
    // rightEdge.style.background = "yellow";
    rightEdge.style.zIndex = edgeZIndex;
    rightEdge.addEventListener("mousedown", function(e)
    {
        dragObj.state = true;
        dragObj.para = {"width":parseInt(dialog.style.width), "x" : e.clientX};
        dragObj.timerId = setInterval(function()
        {
            if(dragObj.state = true)
            {
                dialog.style.width = dragObj.para.width + (dragObj.nowPt.x - dragObj.para.x) + "px";
            }
        }, 10);
        
    });
    rightEdge.addEventListener("mouseover", function(e)
    {
        rightEdge.style.cursor = "e-resize";
    });
    
    // 底边框
    var btmEdge = document.createElement("div");
    dialog.appendChild(btmEdge);
    btmEdge.style.position = "absolute";
    btmEdge.style.height = edgeWidth + "px";
    btmEdge.style.width = "100%";
    btmEdge.style.bottom = "0px";
    // btmEdge.style.background = "orange";
    btmEdge.style.zIndex = edgeZIndex;
    btmEdge.addEventListener("mousedown", function(e)
    {
        dragObj.state = true;
        dragObj.para = {"height":parseInt(dialog.style.height), "y" : e.clientY};
        dragObj.timerId = setInterval(function()
        {
            if(dragObj.state = true)
            {
                dialog.style.height = dragObj.para.height + (dragObj.nowPt.y - dragObj.para.y) + "px";
            }
        }, 10);
        
    });
    btmEdge.addEventListener("mouseover", function(e)
    {
        btmEdge.style.cursor = "n-resize";
    });
    
    /*标题栏*/
    var dialogtitlebar= document.createElement("div");
    dialog.appendChild(dialogtitlebar);
    dialogtitlebar.style.position = "absolute";
    dialogtitlebar.style.top = "0px";
    dialogtitlebar.style.height = titleHeight + "px";
    dialogtitlebar.style.left = "0px";
    dialogtitlebar.style.right = "0px";
    dialogtitlebar.style.cursor = "move";
    dialogtitlebar.style.background = "green"
    var dialogtitle = document.createElement("span");
    var dialogclose = document.createElement("button");
    dialogtitlebar.appendChild(dialogtitle);
    dialogtitlebar.appendChild(dialogclose);
    dialogtitle.innerHTML = title;
    dialogclose.innerHTML = "×";
    dialogclose.style.float = "right";
    dialogclose.style.display = "block";
    dialogclose.style.height = "20px";
    dialogclose.style.width = "20px";
    dialogclose.style.padding = "0px";
    dialogclose.style.cursor = "pointer";
    dialogclose.addEventListener("click", function()
    {
       dialog.parentNode.removeChild(dialog);
    });
    
    /*实现窗口的移动，这段代码很典型，网上很多类似的代码*/
    if(removeable == true)
    {
        var ismousedown = false;
        var dx, dy;
        dialogtitlebar.addEventListener("mousedown",function(e)
        {
            ismousedown = true;
            dx = parseInt(dialog.style.left) - e.clientX;
            dy = parseInt(dialog.style.top) - e.clientY;
        });
        document.addEventListener("mousemove", function(e)
        {
            if(ismousedown)
            {
                dialog.style.top = e.clientY + dy + "px";
                dialog.style.left = e.clientX + dx + "px";
            }
        });
        /*松开鼠标时要重新计算当前窗口的位置*/
        document.addEventListener("mouseup" , function()
        {
            ismousedown = false;
        });
    }
    
    // 对话框主体
    var dialogbody = document.createElement("div");
    dialog.appendChild(dialogbody);
    dialogbody.style.position = "absolute";
    dialogbody.style.top = titleHeight + "px";
    dialogbody.style.bottom = "0px";
    dialogbody.style.left = "0px";
    dialogbody.style.right = "0px";
    dialogbody.style.background = "#fff";
    dialogbody.style.border = "1px solid";
    if(bodycontent!=null)
    {
        bodycontent.style.display = "block";
        dialogbody.appendChild(bodycontent);
    }
    
    
}

// 创建悬浮对话框
function createHTML2MardDownDialog()
{
    // 控制变量
    var toolBarHeight = 20;
    
    // 各个元素
    var bodyContent = document.createElement('div');    // 对话框最外div
    bodyContent.id = 'HTML2MD_Dialog';
    bodyContent.style.position = "relative";
    bodyContent.style.width = "100%";
    bodyContent.style.height = "100%";
    {   // 工具栏
        var divToolBar = document.createElement('div');
        bodyContent.appendChild(divToolBar);
        divToolBar.style.width = "100%";
        divToolBar.style.height = toolBarHeight + "px";
        // HTML2MD按钮
        var btnConv = document.createElement('input');      
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
        // 添加图片按钮
        var btnAddPic = document.createElement('input');
        divToolBar.appendChild(btnAddPic);
        btnAddPic.type = "button";
        btnAddPic.value = "Img";
        btnAddPic.style.float = "right";
        btnAddPic.onclick = function()
        {
        	var eleText = document.getElementById("MD2HTML_mdText");
        	var eleCheckTab = document.getElementById("MD2HTML_checkTab");
        	if(eleCheckTab.checked)
        	{
        		eleText.value += "    \r\n";
        		eleText.value += "    ![]()";
        		eleText.value += "    \r\n";
        	}
        	else
        	{
        		eleText.value += "\r\n";
        		eleText.value += "![]()";
        		eleText.value += "\r\n";
        	}
        };
        // 是否缩进
        var textTab = document.createElement("label");        
        divToolBar.appendChild(textTab);
        textTab.innerHTML = "缩进";
        textTab.style.float = "right";
        textTab.htmlFor  = "MD2HTML_checkTab";
        var checkTab = document.createElement("input");
        divToolBar.appendChild(checkTab);
        checkTab.type = "checkbox";
        checkTab.id = "MD2HTML_checkTab"
        checkTab.style.float = "right";
        
    }
    {   // MarkDown编辑框
        var divMDdEditor = document.createElement('div');
        bodyContent.appendChild(divMDdEditor);
        divMDdEditor.style.position = "absolute";
        divMDdEditor.style.width = "50%";
        divMDdEditor.style.top = toolBarHeight + "px";
        divMDdEditor.style.bottom = "0px";
        divMDdEditor.style.left = "0px";
        divMDdEditor.style.border = "1px solid #333";
        var textmdEditor = document.createElement('textarea');
        divMDdEditor.appendChild(textmdEditor);
        textmdEditor.style = "width: 100%; height: 100%; border: 0px; padding: 5px; box-sizing: border-box;";
        textmdEditor.id = "MD2HTML_mdText";
    }
    { // html展示框
        var divHTMLDisp = document.createElement('div')
        bodyContent.appendChild(divHTMLDisp);
        divHTMLDisp.style.position = "absolute";
        divHTMLDisp.style.width = "50%";
        divHTMLDisp.style.bottom = "0px"; 
        divHTMLDisp.style.right = "0px"; 
        divHTMLDisp.style.top = toolBarHeight + "px";
        divHTMLDisp.style.border = "1px solid #333";
        var frameHTMLDisp = document.createElement('iframe');
        divHTMLDisp.appendChild(frameHTMLDisp);
        frameHTMLDisp.style="width: 100%; height: 100%; border: 0px; padding: 5px; box-sizing: border-box;";
        frameHTMLDisp.id = "MD2HTML_HTMLFrame";
    }
    // 创建对话框
    createdialog("Html2MD",300,400,bodyContent,"Html2MD",true);
    
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
    divTextSelectionMenu.style = 'display:none;box-shadow: 0px 0px 4px rgba(0,0,0,.5);border: solid 1px #000;position: absolute;background: #fff;';
    {   // 工具栏
        var divToolBar = document.createElement('div');
        divTextSelectionMenu.appendChild(divToolBar);
        // 下拉选择框，选择各种Markdown样式
        var selMarkDownType = document.createElement('select');
        divToolBar.appendChild(selMarkDownType);
        selMarkDownType.style.display = "inline-block";
        selMarkDownType.id = "HTML2MD_TypeSelect"
        var optMarkDownText = document.createElement('option');
        selMarkDownType.appendChild(optMarkDownText);
        optMarkDownText.innerHTML = "text";
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
                var isTabbed = document.getElementById("HTML2MD_IsTabbed");
                if(isTabbed.checked)
                {
                    str = "    " + str.split("\n").join("\n    ");
                }
                mdText.value += "\r\n";
                mdText.value += str;
                mdText.value += "\r\n";
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
            else if(selection.value == "text")
            {
                addMarkDown(text.value);
            }
        };
        // 是否缩进的选择
        var btnIsTabbed = document.createElement('input');
        divToolBar.appendChild(btnIsTabbed);
        btnIsTabbed.type = "checkbox";
        btnIsTabbed.id = "HTML2MD_IsTabbed";
        var tabText = document.createTextNode("缩进"); // 创建一个文本节点
        divToolBar.appendChild(tabText);
        
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
    var ele = document.elementFromPoint(e.pageX, e.pageY);
    if(!$.contains(dialog, ele) && (menu.style.display == "" || menu.style.display == "none"))
    {
        var selectedText = getSelected();
        if(selectedText != '')
        {
            var textEdit = document.getElementById('textEdit');
            textEdit.value = selectedText;
            menu.style.display = 'block';
            menu.style.left = e.pageX + 5 + 'px';
            menu.style.top  = e.pageY + 5 + 'px';
        }
    }
});


$(document).on("mousedown", function(e) 
{
    var menu = document.getElementById("menu");
    if(menu.style.display == "block")
    {
        if(!$.contains(menu, e.target))
        {
            menu.style.display = 'none';
        }
    }
        
});
