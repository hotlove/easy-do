import DaoMapper from "@/dbutil/DaoMapper";
import {TodoItem} from "@/types";

let daoMapper = new DaoMapper();

class TotoItemMapper {
    public insert(doc: TodoItem) {
        daoMapper.insert(doc, (err, newDoc) => {
            console.log(err)
            console.log(newDoc)
        });
    }

    public find(options: any): any {
        daoMapper.find(options, (err: Error, docs: TodoItem) => {
            console.log(err);
            console.log(docs);
            return docs;
        })
    }
}

export default new TotoItemMapper();
