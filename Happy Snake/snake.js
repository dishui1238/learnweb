//===========================创建蛇对象======================================================
        (function () {
            var elements = [];//存放小蛇身体的每个部分
            function Snake(width, height, direction) {
                this.width = width || 20;
                this.height = height || 20;
                this.direction = direction || "right";
                this.body = [
                    { x: 3, y: 2, color: "red" },//头
                    { x: 2, y: 2, color: "orange" },//身体
                    { x: 1, y: 2, color: "orange" }//身体
                ];
            }
            //通过原型为snake添加初始化方法
            Snake.prototype.init = function (map) {
                remove();
                //遍历数组，添加div
                for (var i = 0; i < this.body.length; i++) {
                    var div = document.createElement("div");
                    map.appendChild(div);
                    var obj = this.body[i];
                    //设置div样式
                    div.style.position = "absolute";
                    div.style.width = this.width + "px";
                    div.style.height = this.height + "px";
                    div.style.left = obj.x * this.width + "px";
                    div.style.top = obj.y * this.width + "px";
                    div.style.backgroundColor = obj.color;
                    //将创建的snake对象添加到数组
                    elements.push(div);
                }
            };
            //通过原型为snake添加move方法
            Snake.prototype.move = function (map, food) {
                var i = this.body.length - 1;
                //身体部分
                for (; i > 0; i--) {
                    this.body[i].x = this.body[i - 1].x;
                    this.body[i].y = this.body[i - 1].y;
                }
                //头部
                switch (this.direction) {
                    case "right": this.body[0].x += 1; break;
                    case "left": this.body[0].x -= 1; break;
                    case "top": this.body[0].y += 1; break;
                    case "bottom": this.body[0].y -= 1; break;
                }
                //判断snake有没有吃到食物
                var headX = this.body[0].x * this.width;
                var headY = this.body[0].y * this.height;
                //判断小蛇的头的坐标和食物的坐标是否相同
                if (headX == food.x && headY == food.y) {
                    //获取snake最后的尾巴
                    var last=this.body[this.body.length-1];
                    this.body.push({
                        x:last.x,
                        y:last.y,
                        color:last.color
                    });
                    food.init(map);
                }
               

            };
            //通过原型为snake添加remove私有函数
            function remove() {
                var i = elements.length - 1;
                for (; i >= 0; i--) {
                    elements[i].parentNode.removeChild(elements[i]);
                    elements.splice(i, 1);
                }
            }
            //将snake对象暴露给window，外部可以使用
            window.Snake = Snake;
        })();