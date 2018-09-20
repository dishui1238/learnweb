var fs = require('fs');
// 成功时 error为 null
// 失败时 data为 undefined
fs.readFile('test1.txt',function(error,data){
    if(error){
        console.log(error);
        return;
    }
    console.log(data);
//<Buffer 68 65 6c 6c 6f 20 4e 6f 64 65 4a 53 0d 0a 68 65 6c 6c 6f 20 77 6f 72 6c 64 21>
// 返回的值为十六进制
    console.log(data.toString());
})

fs.writeFile('test.txt','我是写入的文件！！',function(error){
    if(error){
        console.log('文件写入失败！');
        return;
    }
    console.log('文件写入成功！');
})
