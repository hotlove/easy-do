import DaoMapper from "@/dbutil/nedbutil/DaoMapper";
import {TodoItem} from "@/types";
import NeDBExample from "@/dbutil/nedbutil/NeDBExample";

class TotoItemMapper extends DaoMapper<TodoItem>{

    // 新增文档
    public insert(value: TodoItem): Promise<TodoItem> {
        return this.dataStroe.insert(value);
    }

    protected getDBName(): string {
        return "todoItem";
    }
}

export default new TotoItemMapper();
