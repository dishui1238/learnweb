//============================游戏对象========================================================
        (function () {
            var that = null;
            function Game(map) {
                this.food = new Food();
                this.snake = new Snake();
                this.map = map;
                that = this;
            }
            Game.prototype.init = function (map) {//初始化游戏
                //初始化map、food、snake
                this.food.init(this.map);
                this.snake.init(this.map);
                var timeId = setInterval(function () {//定时器里面的代码是window
                    that.snake.move(that.map, that.food);
                    that.snake.init(that.map);
                    var maxX = map.offsetWidth / that.snake.width;
                    var maxY = map.offsetHeight / that.snake.height;
                    var headX = that.snake.body[0].x;
                    var headY = that.snake.body[0].y;
                    if (headX >= maxX || headX < 0) {
                        clearInterval(timeId);
                        alert("游戏结束");
                    }
                    if (headY >= maxY || headY < 0) {
                        clearInterval(timeId);
                        alert("游戏结束");
                    }
                }, 150)
                this.bindKey();
            }
            Game.prototype.bindKey = function () {
                document.addEventListener("keydown", function (e) {
                    switch (e.keyCode) {
                        case 37: this.snake.direction = "left"; break;
                        case 38: this.snake.direction = "bottom"; break;
                        case 39: this.snake.direction = "right"; break;
                        case 40: this.snake.direction = "top"; break;
                    }
                }.bind(that), false)
            };
            window.Game = Game;
        })();
        var game = new Game(document.querySelector(".map"));
        game.init(document.querySelector(".map"));