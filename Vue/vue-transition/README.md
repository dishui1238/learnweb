# vue 动画
## [过渡的类名实现动画](https://cn.vuejs.org/v2/guide/transitions.html)

在进入/离开的过渡中，会有 6 个 class 切换。

1. v-enter：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。

2. v-enter-active：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。

3. v-enter-to: 2.1.8版及以上 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。

4. v-leave: 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。

5. v-leave-active：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。

6. v-leave-to: 2.1.8版及以上 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。
![class](https://github.com/dishui1238/learnweb/blob/master/Vue/vue-transition/imgs/transition.JPG)


> 对于这些在过渡中切换的类名来说，如果你使用一个没有名字的 `<transition>`，则 v- 是这些类名的默认前缀。如果你使用了 `<transition name="my-transition">`，那么 `v-enter` 会替换为 `my-transition-enter`。

## 使用第三方 animate.css 类库实现动画

animate.css是一个使用CSS3的animation制作的动画效果的CSS集合，里面预设了很多种常用的动画

1. 引用 `npm i animate.css`
2. 使用
```html
<input type="button" value="toggle3" @click="flag=!flag">
<transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut" :duration="1000">
    <h3 v-if="flag">隐藏/显示H33</h3>
</transition>
```
或者
```html
<input type="button" value="toggle3" @click="flag=!flag">
<transition enter-active-class="bounceIn" leave-active-class="bounceOut">
    <h3 v-if="flag" class="animated">隐藏/显示H33</h3>
</transition>
```
*enter-active-class入场动画，leave-active-class离场动画，:duration过程时长（ms），animated类可以绑定到元素上，如果想要费别设置入场、离场时间，可用`:duration="{enter:200,leave:1000}"`*

## 使用钩子函数实现动画

```js
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
```
```js
methods: {
        beforeEnter(el){
            el.style.transform="translate(0,0)"
        },
        enter(el,done){
            // 这句话没有实际作用，但是不写的话，没有动画效果 el.offsetHeight或者el.offsetTop
            el.offsetWidth
            el.style.transform = "translate(150px,350px)"
            el.style.transition = 'all ease 1s'
            // done是afterEnter函数的引用，动画完成后立即调用afterEnter()
            done()
        },
        afterEnter(el){
            this.flag = !this.flag
        }
}
```

## [使用 transition-group 元素实现列表动画](https://cn.vuejs.org/v2/guide/transitions.html#%E5%88%97%E8%A1%A8%E8%BF%87%E6%B8%A1)

*如果要为 v-for 循环元素创建动画，必须为元素设置 :key 属性*
- v-move 将元素从之前的位置平滑过渡新的位置。
```css
.v-move{
    transition: all 0.6s ease;
    }
.v-leave-active{
    position: absolute;
    }
```
*一般 v-move 和 v-leave-active 配合使用，可以使后续元素，渐渐地飘上来*

- appear 属性，入场效果
- tag 属性，设置transition-group渲染为指定元素，默认span标签  `tag="ul"`

```html
            <transition-group appear tag="ul">
                <!-- 如果要为 v-for 循环元素创建动画，必须为元素设置 :key 属性 -->
                <li v-for="item in list" :key="item.id" @click="del(item.id)">{{ item.name }}</li>

            </transition-group>
```
