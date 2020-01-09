// import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'
import Datastore from "nedb-promises"
import NeDBExample from "@/dbutil/NeDBExample";
import Nedb from "nedb";

export default abstract class DaoMapper<T> {

    protected dataStroe: Datastore;

    constructor() {
        let dbName: string = this.getDBName();
        this.dataStroe = Datastore.create({
            autoload: true,
            filename: path.join(remote.app.getPath('userData'), '/' + dbName + '.db')
        })
    }
    // 子方法用于获取本地数据库名称
    protected abstract getDBName(): string;

    // 新增文档
    public abstract insert(value: T): Promise<T>;

    // 修改文档
    public abstract update(example: NeDBExample, updateQuery: any, options: any): Promise<Number>;

    // 删除文档
    public abstract delete(example: NeDBExample, options: any): Promise<Number>

    // 查询文档
    public abstract find(example: NeDBExample): any

}
