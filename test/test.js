// require the little-db
// 引入little-db
const db = require('../dist/index.cjs')

// get a database object
// 得到数据库对象
const user = db.create('user')

// Next, you just need to operate on the user object
// 接下来你只需要对user对象进行操作即可

// set a property
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
