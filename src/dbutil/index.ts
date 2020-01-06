import leveldown from "leveldown";
import levelup from "levelup";
import {AbstractIteratorOptions} from "abstract-leveldown";

let edoDb = levelup(leveldown(__dirname+"data/edo-db"));

export default class DaoMapper<T> {

    // 增加
    public add(key: any, value: T): void {
        edoDb.batch().put(key, value);
    }

    // 删除
    public delete(key: any): void {
        edoDb.batch().del(key);
    }

    // 更新
    public update(key: any, value: T): void {
        this.add(key, value);
    }

    // 查询
    public select(key: any, options: AbstractIteratorOptions): any {
        edoDb.iterator(options).db.get(key, (err, value) => {
            return value as T;
        })
    }
}