/**
 * Created by Admin on 2018-6-26.
 */
function my$(id) {
    return document.getElementById(id);
}

//innerText与textContent兼容代码
//设置标签的文本内容
function setInnerText(element,text) {
    if(typeof element.textContent=="undefined"){
        element.innerText=text;
    }else{
        element.textContent=text;
    }
}
//获取标签的文本内容
function getInnerText(element) {
    if(typeof element.textContent=="undefined"){
        return element.innerText;
    }else{
        return element.textContent;
    }
}