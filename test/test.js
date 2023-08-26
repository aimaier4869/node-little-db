// 引入little-db
const db = require('../dist/index.js')

// 得到数据库对象
const user = db.use('user')

// 接下来你只需要对user对象进行操作即可

// 设置属性
user.name = 'jack'
user.age = 18
user.hobbies = ['eating', 'sleaping', 'playing Peas']
user.hobbies.push('fish')
user.gender = true
user.address = {
    country: 'China',
    city: 'Beijing',
}
user.address.city = 'Shanghai'
