var fs = require('fs')
var dbPath = './db.json'
/**
 * 查询所有学生信息
 * callback中参数
 *  1.error
 *  2.数据
 */
exports.find = function (callback) {
    // 获取函数异步操作的结果，必须使用回调函数
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        callback(null, JSON.parse(data).students)
    })
}
exports.findById = function (id, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        var result = students.find(function (item) {
            return item.id === parseInt(id)
        })
        callback(null, result)
    })
}
/**
 * 添加保存学生信息
 */
exports.save = function (student, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        student.id = students[students.length - 1].id + 1
        students.push(student)
        // students是一个数组，db.json文件中students外面包了一个对象
        var fileData = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, fileData, function (err, data) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}

/**
 * 删除学生信息
 */
exports.delete = function (id, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        var deleteId = students.findIndex(function (item) {
            return item.id === parseInt(id)
        })
        students.splice(deleteId, 1)
        var fileData = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                callback(err)
            }
        })
        callback(null)
    })
}

/**
 * 更新学生信息
 */
exports.updateById = function (student, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        student.id = parseInt(student.id) //字符串类型的id转为数字类型id
        var students = JSON.parse(data).students
        var stu = students.find(function (item) {
            return item.id === student.id
        })
        for (var key in student) {
            stu[key] = student[key]
        }
        var fileData = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, fileData, function (err, data) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}
