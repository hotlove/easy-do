// import Datastore from 'nedb'
import { NeDBExample } from '@/dbutil/nedbutil/NeDBExample';
import {remote} from 'electron';
import Datastore from 'nedb-promises';
import path from 'path';

abstract class DaoMapper<T> {

    protected dataStroe: Datastore;

    constructor() {
        const dbName: string = this.getDBName();
        this.dataStroe = Datastore.create({
            autoload: true,
            filename: path.join(remote.app.getPath('userData'), '/' + dbName + '.db'),
        });
    }

    // 新增文档
    public abstract insert(value: T): Promise<T>;

    // 修改文档
    public update(example: NeDBExample, updateQuery: T): Promise<Number> {
        const criteria = example.getCriteria();
        const options: any = {
            muti: true,
        };
        return this.dataStroe.update(criteria, updateQuery, options);
    }

    // 删除文档
    public delete(example: NeDBExample): Promise<Number> {
        const criteria = example.getCriteria();
        const options: any = {
            muti: true,
        };
        return this.dataStroe.remove(criteria, options);
    }

    // 查询文档
    public find(example: NeDBExample = new NeDBExample(), page: number = 1, pagesize: number = 0): any {
        const criteria = example.getCriteria();
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
