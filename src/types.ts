export interface IOptions {
    /**
     * 文件的存放路径
     */
    path?: string
    /**
     * 要替换的数据，每次运行都会覆盖原来的数据
     */
    data?: any
    /**
     * 初始数据，只有在文件不存在时才会生效
     */
    initialData?: any
    /**
     * 文件编码
     */
    encoding?: BufferEncoding
}

export interface IRealOptions extends Omit<Required<IOptions>, 'data'> {
    data?: IOptions['data']
}
