//==========================创建食物对象===================================================
        (function () {//不写形参、实参window也可以
            var elements = [];//用来保存每个div食物的
            //有宽、高、颜色、横纵坐标---先定义构造函数，然后创建对象
            function Food(width, height, x, y, color) {//定义构造函数
                this.width = width || 20;
                this.height = height || 20;
                this.x = x || 0;
                this.t = y || 0;
                this.color = color || "green";
            }
            //通过原型为Food添加初始化方法
            Food.prototype.init = function (map) {
                remove();//先删除，后创建
                //创建div,并追加到map中
                var div = document.createElement("div");
                map.appendChild(div);
                //产生随机x,y坐标
                this.x = parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
                this.y = parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;
                //设置div样式
                div.style.width = this.width + "px";
                div.style.height = this.height + "px";
                div.style.left = this.x + "px";
                div.style.top = this.y + "px";
                div.style.backgroundColor = this.color;
                div.style.position = "absolute";//脱离文档流
                //把div加入到数组elements中
                elements.push(div);
            };
            //删除食物---私有函数
            function remove() {
                for (var i = 0; i < elements.length; i++) {
                    elements[i].parentNode.removeChild(elements[i]);
                    //把数组中的这个值也删掉
                    elements.splice(i, 1);
                }
            }
            //把Food暴露给window，使其成为全局变量
            window.Food = Food;
        })();