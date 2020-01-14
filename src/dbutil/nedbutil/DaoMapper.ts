// import Datastore from 'nedb'
import path from 'path'
import {remote} from 'electron'
import Datastore from "nedb-promises"
import { NeDBExample } from "@/dbutil/nedbutil/NeDBExample";

abstract class DaoMapper<T> {

    protected dataStroe: Datastore;

    constructor() {
        let dbName: string = this.getDBName();
        console.log(remote.app.getPath('userData'));
        this.dataStroe = Datastore.create({
            autoload: true,
            filename: path.join(remote.app.getPath('userData'), '/' + dbName + '.db')
        });
    }

    // 新增文档
    public abstract insert(value: T): Promise<T>;

    // 修改文档
    public update(example: NeDBExample, updateQuery: any): Promise<Number> {
        let criteria = example.getCriteria();
        let options: any = {
            muti: true
        };
        return this.dataStroe.update(criteria, updateQuery, options);
    }

    // 删除文档
    public delete(example: NeDBExample): Promise<Number> {
        let criteria = example.getCriteria();
        let options: any = {
            muti: true
        };
        return this.dataStroe.remove(criteria, options);
    }

    // 查询文档
    public find(example: NeDBExample = new NeDBExample(), page: number = 1, pagesize: number = 0): any {
        let criteria = example.getCriteria();
        if (pagesize === 0) {
            return this.dataStroe.find(criteria);
        } else {
            return this.dataStroe.find(criteria).skip((page - 1) * pagesize).limit(pagesize);
        }
    }
    // 子方法用于获取本地数据库名称
    protected abstract getDBName(): string;
}

export { DaoMapper };
