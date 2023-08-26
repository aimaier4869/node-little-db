import * as path from 'path'

/**
 * 获取文件名
 * @param filename 文件名
 * @returns 一个包含扩展名的文件名
 */
export function getFileName(filename?: string) {
    // 如果文件名为空，则使用默认文件名
    if (!filename) {
        filename = `db-${Date.now()}`
    }
    // 用node的path模块判断文件名是否有后缀，如果没有则加上后缀
    if (!path.extname(filename)) {
        filename += '.json'
    }
    return filename
}
