function clone<T>(data: T): T{ //T的意思是传入什么类型就返回什么类型
    return  JSON.parse(JSON.stringify(data));
}
export default clone;