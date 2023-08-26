import db from '../dist/index.js'

const user = db.use('user')

user.a = 1
user.b = []

user.b.push(1)
user.b.push(2)
user.b.push(3)

user.b.splice(1, 1)

console.log(user)
