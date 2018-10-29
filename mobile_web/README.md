# 移动 web 介绍

## 1. 移动 web 现状

电商双十一营业额的85%

## 2. 移动 web 适配问题

- 屏幕尺寸不一（手机，pad）
- 解决：百分比自适应布局（流式布局），同时随移动端的 viewport 视口进行设置

**流式布局**
> 就是百分比布局，非固定像素，内容向两侧填充，理解成流动的布局
> 视觉窗口：viewport 是移动端特有，这是一个虚拟的区域，用来承载网页

### 适配方案

1. 网页宽度必须和浏览器保持一致
2. 默认显示的缩放比例和PC端保持1.0
3. 不准许影虎自行缩放网页

### 标准适配方案

```html
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover">
```

### 非主流适配方案


