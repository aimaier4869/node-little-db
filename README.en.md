# node-little-db

## Introduction

`node-little-db` is a third-party Node.js library that helps you synchronize object content to a file. Its principle is simple: when you change the content of an object, it automatically calls `fs.writeFileSync()` to write the object content to a file.

## Installation

Install `node-little-db` using the following command:

```sh
npm i node-little-db
```

## Usage

First, import the `node-little-db` library:

```js
const db = require('node-little-db')
```

Then, get a database object:

```js
const user = db.use('user')
```

Now, you can perform operations on the `user` object.

#### Set Properties

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

After running the above code, the content of your file is:

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

#### Read Properties

```js
user.name // 'jack'
user.age // 18
user.hobbies // ['eating', 'sleeping', 'playing Peas']
user.gender // true
user.address // {country: 'China', city: 'Beijing'}
user.address.city // 'Shanghai'
```

## Methods

### db.use([filename, options])

Creates a database object using the specified file. Calling this method will return a proxy object, and any operations performed on this object will be synchronized to the file.

-   `filename` (optional): The file name. If not provided, the default file name `db-${Date.now()}.json` will be used.
-   `options` (optional): Options object.
    -   `options.path`: The file storage path.
    -   `options.initialData`: Initial data used when creating the file for the first time.
    -   `options.encoding`: File encoding, defaults to `utf-8`.
