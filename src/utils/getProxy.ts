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
    fs.writeFileSync(filePath, JSON.stringify(data), {
        encoding: options.encoding,
    })
}

/**
 * 获取代理对象
 * @param filename 文件名
 * @param options 选项
 */
export function getProxy(filename: string, options: IRealOptions) {
    const filePath = path.resolve(options.path, filename)

    let target

    // 若文件不存在，则创建文件，创建时要支持多级目录
    if (!fs.existsSync(filePath)) {
        const dir = path.dirname(filePath)
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }
        target = options.initialData
        writeFileSync(filePath, target, options)
    } else {
        target = readFileSync(filePath, options)
    }

    return new Proxy(target, {
        get(target, prop) {
            return Reflect.get(target, prop)
        },
        set(target, prop, value) {
            const success = Reflect.set(target, prop, value)

            if (success) {
                writeFileSync(filePath, target, options)
            }
            return success
        },
    })
}
