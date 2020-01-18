// import Datastore from 'nedb'
import { NeDBExample } from '@/dbutil/nedbutil/NeDBExample';
import {remote} from 'electron';
import Datastore from 'nedb-promises';
import path from 'path';

abstract class DaoMapper<T> {

    protected dataStore: Datastore;

    constructor() {
        const dbName: string = this.getDBName();
        this.dataStore = Datastore.create({
            autoload: true,
            filename: path.join(remote.app.getPath('userData'), '/db/' + dbName + '.db'),
        });
        console.log(path.join(remote.app.getPath('userData'), '/db/' + dbName + '.db'));
    }

    // 新增文档
    public abstract insert(value: T): Promise<T>;

    // 修改文档
    public update(example: NeDBExample, updateQuery: T): Promise<Number> {
        const criteria = example.getCriteria();
        const options: any = {
            muti: true,
        };
        return this.dataStore.update(criteria, updateQuery, options);
    }
    // 修改文档
    public testupdate(example: NeDBExample, updateQuery: T): void {
        const criteria = example.getCriteria();
        const options: any = {
            muti: true,
        };
        this.dataStore.update(criteria, updateQuery, options).then((result: number) => {
            console.log(result);
        });
    }

    // 删除文档
    public delete(example: NeDBExample): Promise<Number> {
        const criteria = example.getCriteria();
        const options: any = {
            muti: true,
        };
        return this.dataStore.remove(criteria, options);
    }

    // 查询文档
    public find(example: NeDBExample = new NeDBExample(), page: number = 1, pagesize: number = 0): any {
        const criteria = example.getCriteria();
        if (pagesize === 0) {
            return this.dataStore.find(criteria);
        } else {
            return this.dataStore.find(criteria).skip((page - 1) * pagesize).limit(pagesize);
        }
    }
    // 子方法用于获取本地数据库名称
    protected abstract getDBName(): string;
}

export { DaoMapper };
