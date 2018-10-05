# JS中定义变量

- js中三种定义变量的方式const， var， let的区别。
   1. const定义的变量不可以修改，而且必须初始化。
   2. var定义的变量可以修改，如果不初始化会输出undefined，不会报错。
   3. let是块级作用域，函数内部使用let定义后，对函数外部无影响。

- JS中 =>> 为ES6语法
   + 表示arrow function

# mongoDB基本命令

- show dbs——显示所有数据的列表。
- db ——显示当前数据库对象或集合。
- use——连接到一个指定的数据库，如不存在则创建数据库
- db.Students.insertOne({"name":"jack"})——插入一条数据
- show collections——查看集合
- db.Students.find()——查询students集合中的数据

## 创建数据库

` use 数据库名`

- *注意：MongoDB 中默认的数据库为 test，如果你没有创建新的数据库，集合将存放在 test 数据库中。*
- *在 MongoDB 中，集合只有在内容插入后才会创建! 就是说，创建集合(数据表)后要再插入一个文档(记录)，集合才会真正创建。*


## 删除数据库

`db.dropDatabase() 删除当前数据库，默认为 test，可以使用 db 命令查看当前数据库名。` 

`db.collection.drop() 删除集合  show tables显示当前数据集合 collection为集合名称`

# mongoose

## 1. 基础介绍

### 1.1 安装引用

- mongod 启动数据库

 ```

	var mongoose = require('mongoose');
	var db = mongoose.connect("mongodb://127.0.0.1:27017/test");
	db.connection.on("error", function (error) {
    	console.log("数据库连接失败：" + error);
	});
	db.connection.on("open", function () {
   		console.log("------数据库连接成功！------");
	});

 ```

### 1.2 Schema

Schema：一种以文件形式存储的数据库模型骨架，无法直接通往数据库端，也就是说它不具备对数据库的操作能力，仅仅只是数据库模型在程序片段中的一种表现，可以说是数据属性模型(传统意义的表结构)，又或着是"集合"的模型骨架。

定义一个Schema

```

	var mongoose = require("mongoose");

	var TestSchema = new mongoose.Schema({

    	name : { type:String },//属性name,类型为String

    	age  : { type:Number, default:0 },//属性age,类型为Number,默认为0

    	time : { type:Date, default:Date.now },

    	email: { type:String,default:''}

	});

```

注：Schema定义集合结构（定义表的列）

### 1.3 model操作数据库

```

// 创建Model

	var TestModel = db.model("test1", TestSchema);

### 1.4 Entity--给集合赋值

	var TestEntity = new TestModel({   //插入数据

        name : "Lenka",

       	age  : 36,

       	email: "lenka@qq.com"

	});

	console.log(TestEntity.name); // Lenka

	console.log(TestEntity.age); // 36

// 将test1写入到数据库中

	TestEntity.save(function(error,doc){

  	if(error){

     	console.log("error :" + error);

  	}else{

     	console.log(doc);

  	}

	});

```
## 2. 增删改查

### 2.1 查询

find查询： obj.find(查询条件,callback);

```

	Model.find({},function(error,docs){

   	//若没有向find传递参数，默认的是显示所有文档

	});


```
```

	Model.find({ "age": 28 }, function (error, docs) {
	//根据条件查询
 	 if(error){

    	console.log("error :" + error);

 	 }else{

    	console.log(docs); //docs: age为28的所有文档

	}

	});
