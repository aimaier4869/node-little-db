# little-db

> Tiny local JSON database for Node and Electron
> 小型项目的小型本地 JSON 数据库

```js
// require the little-db
// 引入little-db
const db = require('little-db')

// get a database object
// 得到数据库对象
const user = db.create('user')
```

## Install 安装

```
For the time being, you need to download the installation package manually
暂时你需要手动下载该包
```

## Usage 使用

```js
// require the little-db
// 引入little-db
const db = require('little-db')

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
user.push('fish')
user.gender = true
user.address = {
    country: 'China',
    city: 'Beijing'
}
user.address.city = 'Shanghai'
```

```json
// user.json
{
    "name": "jack",
    "age": 18,
    "hobbies": [
        "eating",
        "sleaping",
        "playing Peas",
        "fish"
    ],
    "address": {
        "country": "China",
        "city": "Shanghai"
    },
    "gender": true
}
```

```js
// get a property
// 读取属性
user.name // 'jack'
user.age // 18
user.hobbies // ['eating', 'sleaping', 'playing Peas']
user.gender // true
user.address // {country: 'China', city: 'Beijing'}
user.address.city // 'Shanghai'
```

### Methods 方法

### `db.create([dbName, obj, options])`
* `dbName` {String} File name. If this parameter is not passed in, the current timestamp will be used as the file name. If the file does not exist, a new file will be created. If the file exists, the contents of the file will be read.  文件名，不传入该参数将把当前时间戳作为文件名。文件不存在则会创建一个新文件，若文件存在则读取该文件内容。

* obj {Object} Initial data. If this parameter is passed in, the data will be written to the file. 初始数据，如果传入该参数将把数据写入到文件中。

* options {Object} Configuration object. 配置对象。

  * path {String} Database file storage path. 数据库文件存放路径。It should be an absolute path. 推荐传入一个绝对路径
    **Default:** `./db/`