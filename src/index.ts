import type { IOptions } from './types'
import { getFileName } from './utils/getFileName'
import { getOptions } from './utils/getOptions'
import { getProxy } from './utils/getProxy'

/**
 * @deprecated 下一个版本将会移除，请使用 `db.use` 代替
 */
function create(filename?: string, options?: IOptions) {
    return useFile(filename, options)
}

/**
 * 使用文件，调用后会返回一个代理对象，对这个对象的操作会同步到文件中
 * @param filename 文件名，如果不传则使用默认文件名`db-${Date.now()}.json`
 * @param options 选项
 * @param options.path 文件的存放路径
 * @param options.initialData 初始数据，只有当初次创建文件时会使用这个数据
 * @param options.encoding 文件编码，默认为`utf-8`
 */
function useFile(filename?: string, options?: IOptions) {
    // 获取文件名
    filename = getFileName(filename)

    // 处理选项
    const newOptions = getOptions(options)

    // 返回一个代理对象
    return getProxy(filename, newOptions)
}

export default {
    create,
    use: useFile,
    useFile,
}
