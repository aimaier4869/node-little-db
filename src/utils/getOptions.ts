import * as path from 'path'
import { IOptions, IRealOptions } from '../types'

const defaultOptions: IRealOptions = {
    path: path.resolve(process.cwd(), 'db'),
    initialData: {},
    encoding: 'utf-8',
}

/**
 * 处理选项，返回一个新的选项对象，包含所有选项的默认值
 * @param options
 */
export function getOptions(options: IOptions = defaultOptions): IRealOptions {
    // 判断是否同时传入了 `data` 和 `initialData`
    if (options.initialData && options.data) {
        console.warn('同时传入了 `data` 和 `initialData`，`data` 将会被忽略')
        delete options.data
    }

    // 判断是否传入了 `data`
    if (options.data) {
        options.initialData = options.data
        delete options.data
    }

    // 判断path是否是绝对路径
    if (options.path && !path.isAbsolute(options.path)) {
        options.path = path.resolve(process.cwd(), options.path)
    }

    // 判断encoding是否是合法的编码
    if (
        options.encoding &&
        !Buffer.isEncoding(options.encoding as BufferEncoding)
    ) {
        console.warn(
            `编码 ${options.encoding} 不合法，将使用默认编码 ${defaultOptions.encoding}`
        )
        options.encoding = defaultOptions.encoding
    }

    return {
        ...defaultOptions,
        ...options,
    }
}
