import leveldown from "leveldown";
import levelup from "levelup";
import {AbstractIteratorOptions} from "abstract-leveldown";

let edoDb = levelup(leveldown("./edo-db"), {createIfMissing: true}, (err) => {
    console.log(err)
});

export default class DaoMapper<T> {

    // 增加
    public add(key: any, value: T): void {
        let count = edoDb.batch().put(key, JSON.stringify(value)).length;
        console.log(count);
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
            console.log(err);
            console.log(value);
            return value as T;
        })
    }
}
