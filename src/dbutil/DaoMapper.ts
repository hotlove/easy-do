// import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'
import Datastore from "nedb-promises"


let datastore = Datastore.create({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/data.db')
});

export default abstract class DaoMapper<T> {
    
    protected dataStroe = datastore;
   
    public abstract insert(value: T): Promise<T>;

    public abstract update(query: any, updateQuery: any, options: any): Promise<Number>;

    public abstract delete(query: any, options: any): Promise<Number>

}
