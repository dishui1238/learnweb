/**
 * Created by Admin on 2018-7-11.
 */
/**
 * ��ȡ��һԪ��
 * @param id    Ԫ��idֵ
 * @returns {Element}
 */
function my$(id) {
    return document.getElementById(id);
}
/**
 * ��ȡ��һԪ�ؼ�������ʽ����
 * @param element   ��һԪ��
 * @param attr      Ԫ�ص���һ����
 * @returns {*}
 *
 * ����getStyle(my$("dv"),"left");
 */
function getStyle(element, attr) {
    return window.getComputedStyle ? getComputedStyle(element, null)[attr] : element.currentStyle[attr];
}
/**
 * ����һ��Ԫ�ص�����һ�����ԣ�������ָ��λ��
 * @param element   ����һ��Ԫ��
 * @param attr      Ԫ�ص���һ����
 * @param target    Ŀ��λ��
 */
function animate1(element, attr, target) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        var current = parseInt(getStyle(element, attr));//ת������������
        var step = (target - current) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        current += step;
        element.style[attr] = current + "px";
        if (current == target) {
            clearInterval(element.timeId);
        }
        //console.log("Ŀ��λ�ã�" + target + "=====��ǰλ�ã�" + current + "====������" + step);
    }, 20);
}

/**
 * ��������
 * ��my$("btn").onclick = function () {
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
        for (var attr in json) {//�ж�attr�Ƿ�ΪzIndex
            if (attr == "zIndex") {
                element.style[attr] = json[attr];
            }
            else if (attr == "opacity") {//�ж�attr�Ƿ�Ϊopacity
                //��ȡ��ǰ͸���ȣ��Ŵ�100��
                var current = getStyle(element, attr) * 100;
                //Ŀ��͸���ȷŴ�100��
                var target = json[attr] * 100;
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                element.style[attr] = current / 100;//�����С100��
            }
            else {//��ͨ����
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
            //���������Ե���ָ��λ�ú�ִ�лص�����,ǰ�����û��������������
            if (fn) {
                fn();
            }
        }
    }, 20);
}
//ͼƬ��������,�������κε��������ʵ��
//window.event���¼���������e�ļ���
//clientX��clientY������ʹ�õļ��ݴ���
//scrollLeft��scrollTop�ļ��ݴ���
//pageX,pageY��clientX+scrollLeft ��clientY+scrollTop

//�Ѵ����װ��һ������

//�Ѵ������һ��������
var evt = {
    //window.event���¼���������e�ļ���
    getEvent: function (evt) {
        return window.event || evt;
    },
    //��������ĺ�����ļ��ݴ���
    getClientX: function (evt) {
        return this.getEvent(evt).clientX;
    },
    //���������������ļ��ݴ���
    getClientY: function (evt) {
        return this.getEvent(evt).clientY;
    },
    //ҳ�����������ȥ�ĺ�����
    getScrollLeft: function () {
        return window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft || 0;
    },
    //ҳ�����Ͼ�����ȥ��������
    getScrollTop: function () {
        return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0;
    },
    //�����ҳ��ĺ�����(pageX������clientX+scrollLeft)
    getPageX: function (evt) {
        return this.getEvent(evt).pageX ? this.getEvent(evt).pageX : this.getClientX(evt) + this.getScrollLeft();
    },
    //�����ҳ���������(pageY������clientY+scrollTop)
    getPageY: function (evt) {
        return this.getEvent(evt).pageY ? this.getEvent(evt).pageY : this.getClientY(evt) + this.getScrollTop();
    }
};
