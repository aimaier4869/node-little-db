# node-little-db

## 简介

`node-little-db`是一个基于 Node.js 的第三方库，用于将对象内容同步到文件中。它的原理非常简单，当您更改对象的内容时，它会自动调用`fs.writeFileSync()`方法将对象内容写入文件。

## 文档

[English](./README.en.md)

## 安装

通过以下命令安装`node-little-db`：

```sh
npm i node-little-db
```

## 使用

首先，引入`node-little-db`库：

```js
const db = require('node-little-db')
```

然后，获取一个响应式对象：

```js
const user = db.use('user')
```

现在，您可以对`user`对象进行操作了。

#### 设置属性

```js
user.name = 'jack'
user.age = 18
user.hobbies = ['eating', 'sleeping', 'playing Peas']
user.hobbies.push('fish')
user.gender = true
user.address = {
    country: 'China',
    city: 'Beijing',
}
user.address.city = 'Shanghai'
```

运行后的文件内容示例

```js
{
    "name": "jack",
    "age": 18,
    "hobbies": [
        "eating",
        "sleeping",
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

#### 读取属性

```js
user.name // 'jack'
user.age // 18
user.hobbies // ['eating', 'sleeping', 'playing Peas']
user.gender // true
user.address // {country: 'China', city: 'Beijing'}
user.address.city // 'Shanghai'
```

## 方法

### db.use([filename, options])

使用指定的文件获取响应式对象，调用该方法后将返回一个代理对象，通过对这个对象进行操作，更改将被同步到文件中。

-   `filename`（可选）：文件名。如果未提供文件名，则会使用默认文件名 `db-${Date.now()}.json`。
-   `options`（可选）：选项对象。
    -   `options.path`：文件存放路径。
    -   `options.initialData`：初始数据，在首次创建文件时使用。
    -   `options.encoding`：文件编码，默认为 `utf-8`。
