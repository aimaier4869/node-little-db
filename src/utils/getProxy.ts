import * as path from 'path'
import * as fs from 'fs'
import { IOptions, IRealOptions } from '../types'

const readFileSync = (filePath: string, options: IRealOptions) => {
    return JSON.parse(
        fs.readFileSync(filePath, {
            encoding: options.encoding,
        })
    )
}

const writeFileSync = (filePath: string, data: any, options: IRealOptions) => {
    fs.writeFileSync(filePath, JSON.stringify(data, undefined, 2), {
        encoding: options.encoding,
    })
}

function isObject(val: any) {
    return typeof val === 'object' && val !== null
}

// 设置代理和代理对象的映射关系
const proxyMap = new Map<InstanceType<ProxyConstructor>, any>()
const objectMap = new Map<any, InstanceType<ProxyConstructor>>()

/**
 * 获取代理对象
 * @param filename 文件名
 * @param options 选项
 */
export function getProxy(filename: string, options: IRealOptions) {
    const filePath = path.resolve(options.path, filename)

    let targetObj: any

    // 若文件不存在，则创建文件，创建时要支持多级目录
    if (!fs.existsSync(filePath)) {
        const dir = path.dirname(filePath)
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }
        targetObj = options.initialData
        writeFileSync(filePath, targetObj, options)
    } else {
        if (options.data) {
            writeFileSync(filePath, options.data, options)
            targetObj = options.data
        } else {
            targetObj = readFileSync(filePath, options)
        }
    }

    function reactive(target: any): any {
        let proxy = objectMap.get(target)
        //如果存在，即返回
        if (proxy !== void 0) {
            return proxy
        }
        // 如果target是proxy
        if (proxyMap.has(target)) {
            return target
        }
        // 如果是基本类型，直接返回
        if (!isObject(target)) {
            return target
        }
        const result = new Proxy(target, handle)
        objectMap.set(target, result)
        proxyMap.set(result, target)

        return result
    }
    const handle = { get, set, deleteProperty }

    function get(target: any, propKey: string, receiver: any) {
        let proxy = Reflect.get(target, propKey, receiver)
        //实现多层代理，若为对象，需要递归
        return isObject(proxy) ? reactive(proxy) : proxy
    }
    function set(target: any, propKey: string, value: any, receiver: any) {
        const oldvalue = target[propKey]
        let proxy = Reflect.set(target, propKey, value, receiver)
        writeFileSync(filePath, targetObj, options)

        return proxy
    }
    function deleteProperty(target: any, propKey: string) {
        let proxy = Reflect.deleteProperty(target, propKey)
        writeFileSync(filePath, targetObj, options)
        return proxy
    }
    return reactive(targetObj)
}
