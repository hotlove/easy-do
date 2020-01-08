import DaoMapper from "@/dbutil/DaoMapper";
import {TodoItem} from "@/types";

class TotoItemMapper extends DaoMapper<TodoItem>{

    insert(value: TodoItem): Promise<TodoItem> {
        return this.dataStroe.insert(value);
    }

    update(query: any, updateQuery: any, options: any): Promise<Number> {
        return this.dataStroe.update(query, updateQuery, options);
    }

    delete(query: any, options: any): Promise<Number> {
        return this.dataStroe.remove(query, options);
    }

}

export default new TotoItemMapper();
