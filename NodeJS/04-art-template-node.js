var template = require('art-template')
var html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>模板引擎</title>
</head>
<body>
    <p>hello {{ name }}</p>
    <p>我今年{{ age }}岁了</p>
    <p>我来自{{ province }}
    <p>我喜欢: {{ each hobbies }} {{ $value }} {{ /each }}</p>
</body>
</html>
    `
var ret = template.render(html, {
    name: 'jack',
    age: '18',
    province: '上海市',
    hobbies: ['学习', '听歌', '运动健身', '写代码']
})
console.log(ret)
