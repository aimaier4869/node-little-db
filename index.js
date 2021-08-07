const PATH = require('path');
const fs = require('fs');

let defaultConfig = {
    path: PATH.resolve('./', 'db')
}


/**
 * 
 * @param {String} dbName 文件名
 * @param {Object} obj 初始数据，若文件存在将会替换内容
 * @param {Object} config 配置文件
 * @returns {Proxy} 对象
 */
function create(dbName = Date.now() + '', obj, config) {
    config = { ...defaultConfig, ...config };

    if (typeof dbName !== 'string') throw TypeError('dbName must be string');
    if (!PATH.isAbsolute(config.path)) throw TypeError('config.path must be a absulute path');

    let totalPath = PATH.resolve(config.path, dbName + '.json');

    // 目录是否存在，不存在创建一个
    if (!fs.existsSync(config.path)) {
        fs.mkdirSync(config.path);
    };

    // 文件是否存在，不存在创建一个
    if (!fs.existsSync(totalPath)) {
        fs.closeSync(fs.openSync(totalPath, 'w'));
        if (!obj) { obj = {} };
        fs.writeFileSync(totalPath, JSON.stringify(obj));
    } else {
        if (obj) {
            fs.writeFileSync(totalPath, JSON.stringify(obj));
        } else {
            obj = JSON.parse(fs.readFileSync(totalPath));
        }
    }


    const objectList = new WeakMap()//key: target, value: proxy

    // proxyList 避免proxy对象再次被proxy
    const proxyList = new WeakMap()//key: proxy, value: target

    function reactive(target) {
        let proxy = objectList.get(target);
        //如果存在，即返回
        if (proxy !== void 0) {
            return proxy
        }
        // 如果target是proxy
        if (proxyList.has(target)) {
            return target
        }
        // 如果是基本类型，直接返回
        if (!isObject(target)) {
            return target
        }
        proxy = new Proxy(target, handle)
        objectList.set(target, proxy)
        proxyList.set(proxy, target)

        return proxy;

    }
    const handle = { get, set, deleteProperty };

    function get(target, propKey, receiver) {
        // console.log('get')
        let proxy = Reflect.get(target, propKey, receiver);
        track(target, 'get', propKey)
        return isObject(proxy) ? reactive(proxy) : proxy;
        //实现多层代理，若为对象，需要递归
    }
    function set(target, propKey, value, receiver) {
        const oldvalue = target[propKey];

        let proxy = Reflect.set(target, propKey, value, receiver)
        // 当是新增的属性 或者 数据变化时 ,trigger
        if (!target.hasOwnProperty(propKey)) {
            trigger(target, 'add', propKey)
        } else if (oldvalue !== value) {
            trigger(target, 'set', propKey)
        }

        fs.writeFileSync(totalPath, JSON.stringify(obj));

        return proxy
    }
    function deleteProperty(target, propKey) {
        // console.log('删除')
        let proxy = Reflect.deleteProperty(target, propKey)
        trigger(target, 'delete', propKey)

        fs.writeFileSync(totalPath, JSON.stringify(obj));
        return proxy
    }

    //方法
    function isObject(val) {
        return typeof val === 'object' && val !== null;
    }

    //effect.js

    //收集依赖
    let targetMap = new WeakMap()//所有依赖 key:obj


    //get 时 收集依赖
    function track(target, type, key) {
        // console.log('track-收集依赖', type, target, key)

        if (effectFn) {
            let depsMap = targetMap.get(target);
            //targetMap无target对象，则新建
            if (depsMap === void 0) {
                // console.log('无depsMap')
                targetMap.set(target, (depsMap = new Map()))
            }
            //depsMap无有key这个属性，则新建
            let dep = depsMap.get(key)
            if (dep === void 0) {
                // console.log('无key')
                depsMap.set(key, (dep = new Set()))
            }
            // 放入依赖 effect就是依赖
            if (!dep.has(effectFn)) {
                // console.log('无effect，并放入effect')
                dep.add(effectFn)
            }
        }
    }

    //set 时更新
    function trigger(target, type, key) {
        // console.log('trigger-触发依赖', type, key)

        let depsMap = targetMap.get(target)

        if (depsMap) {
            let deps = depsMap.get(key)
            if (deps) {
                //将当前key对应的effect一次执行
                deps.forEach(effect => {
                    effect()
                })
                // 删除
                if (type == 'delete') {
                    // console.log('delete')
                    depsMap.delete(key)
                }
            }

        }
    }
    //临时存放 effect中的fn参数
    let effectFn = null;

    function effect(fn) {
        try {
            // console.log('try')
            effectFn = fn;
            fn();
        } finally {
            // console.log('finally')
            effectFn = null;
        }
    }

    return reactive(obj);
}


module.exports = {
    create
};


