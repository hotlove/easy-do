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

    protected abstract getDBName(): string;

    public abstract insert(value: T): Promise<T>;

    public abstract update(example: NeDBExample, updateQuery: any, options: any): Promise<Number>;

    public abstract delete(example: NeDBExample, options: any): Promise<Number>

    public abstract find(example: NeDBExample): any

}
