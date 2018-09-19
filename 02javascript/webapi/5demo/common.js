/**
 * Created by Admin on 2018-6-27.
 */
function my$(id) {
    return document.getElementById(id);
}
//获取任意一个父级元素的第一个子级元素
function getFirstElementChild(element) {
    if(typeof element.firstElementChild){
        return element.firstElementChild;
    }else {
        var node=element.firstChild;
        while(node&&node.nodeType!=1){
            node=node.nextSibling;
        }
        return node;
    }
}
//获取任意一个父级元素的最后一个子级元素
function getLastElementChild(element) {
    if(typeof element.lastElementChild){
        return element.lastElementChild;
    }else {
        var node=element.lastChild;
        while(node&&node.nodeType!=1){
            node=node.previousSibling;
        }
        return node;
    }
}
//冒泡排序(由小到大)
function bubbleSort(arr) {
    for(var i=0;i<arr.length-1;i++){
        for(var j=i+1;j<arr.length;j++){
            if(arr[i]>arr[j]){
                var temp=arr[i];
                arr[i]=arr[j];
                arr[j]=temp;
            }
        }
    }
    return arr;
}
//任意一个元素移动一定距离
function animate(element, target) {
    //先清理定时器，使其只产生一个定时器
    clearInterval(element.timeId);
    //获取当前位置，为数值型
    var current = element.offsetLeft;
    element.timeId = setInterval(function () {
        //每次走的像素
        var step = 9;
        step = current < target ? step : -step;
        current += step;
        if (Math.abs(current - target) > Math.abs(step)) {
            element.style.left = current + "px";
        } else {
            clearInterval(element.timeId);
            element.style.left = target + "px";
        }
    }, 1);
}