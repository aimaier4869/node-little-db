export interface IOptions {
    /**
     * 文件的存放路径
     */
    path?: string
    /**
     * 初始数据
     * @deprecated 请使用 `initialData` 代替
     */
    data?: any
    /**
     * 初始数据
     */
    initialData?: any
    /**
     * 文件编码
     */
    encoding?: BufferEncoding
}

export interface IRealOptions extends Omit<Required<IOptions>, 'data'> {}
