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