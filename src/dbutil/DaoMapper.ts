import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'


export default class DaoMapper<T> extends Datastore{
    constructor() {
        super(
            {
                autoload: true,
                filename: path.join(remote.app.getPath('userData'), '/data.db')
            });
    }
}
