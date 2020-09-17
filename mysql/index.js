// 引入 mysql 模块
const mysql = require('mysql')
// 引入数据库配置文件
const config = require('./config')

// 建立连接
let connection = mysql.createConnection({ ...config })
connection.connect()

// 查询语句
connection.query('SELECT * FROM `user`;', (error, results, fields) => {
  console.log(results)
})
