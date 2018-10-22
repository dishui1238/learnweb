/**
 * Created by Admin on 2018-7-11.
 */
/**
 * 获取任一元素
 * @param id    元素id值
 * @returns {Element}
 */
function my$(id) {
    return document.getElementById(id);
}
/**
 * 获取任一元素计算后的样式属性
 * @param element   任一元素
 * @param attr      元素的任一属性
 * @returns {*}
 *
 * 调用getStyle(my$("dv"),"left");
 */
function getStyle(element, attr) {
    return window.getComputedStyle ? getComputedStyle(element, null)[attr] : element.currentStyle[attr];
}
/**
 * 任意一个元素的任意一个属性，缓动到指定位置
 * @param element   任意一个元素
 * @param attr      元素的任一属性
 * @param target    目标位置
 */
function animate1(element, attr, target) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        var current = parseInt(getStyle(element, attr));//转换成数字类型
        var step = (target - current) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        current += step;
        element.style[attr] = current + "px";
        if (current == target) {
            clearInterval(element.timeId);
        }
        //console.log("目标位置：" + target + "=====当前位置：" + current + "====步数：" + step);
    }, 20);
}

/**
 * 缓动动画
 * 例my$("btn").onclick = function () {
        var json1 = {"width": 400, "height": 800, "top": 500, "left": 800,"opacity":0.5};
        animate(my$("dv"), json1, function () {
            var json2 = {"width": 140, "height": 130, "top": 0, "left":0,"opacity":0.1,"zIndex":-1};
            animate(my$("dv"), json2 );
        });
    };
 * @param element
 * @param json
 * @param fn
 */
function animate(element, json, fn) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        var flag = true;
        for (var attr in json) {//判断attr是否为zIndex
            if (attr == "zIndex") {
                element.style[attr] = json[attr];
            }
            else if (attr == "opacity") {//判断attr是否为opacity
                //获取当前透明度，放大100倍
                var current = getStyle(element, attr) * 100;
                //目标透明度放大100倍
                var target = json[attr] * 100;
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                element.style[attr] = current / 100;//最后缩小100倍
            }
            else {//普通类型
                var current = parseInt(getStyle(element, attr));
                var target = json[attr];
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                element.style[attr] = current + "px";
            }
            if (current != target) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(element.timeId);
            //当所有属性到达指定位置后执行回调函数,前提是用户传入了这个函数
            if (fn) {
                fn();
            }
        }
    }, 20);
}