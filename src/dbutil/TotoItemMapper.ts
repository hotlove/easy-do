import DaoMapper from "@/dbutil/DaoMapper";
import {TodoItem} from "@/types";
import NeDBExample from "@/dbutil/NeDBExample";

class TotoItemMapper extends DaoMapper<TodoItem>{

    // 新增文档
    public insert(value: TodoItem): Promise<TodoItem> {
        return this.dataStroe.insert(value);
    }

    // 修改文档
    public update(example: NeDBExample, updateQuery: any): Promise<Number> {
        let criteria = example.getCriteria();
        let options: any = {
            muti: true
        };
        return this.dataStroe.update(criteria, updateQuery, options);
    }

    // 删除文档
    public delete(example: NeDBExample): Promise<Number> {
        let criteria = example.getCriteria();
        let options: any = {
            muti: true
        };
        return this.dataStroe.remove(criteria, options);
    }

    // 查询文档
    public find(example: NeDBExample = new NeDBExample(), page: number = 1, pagesize: number = 0): any {
        let criteria = example.getCriteria();
        if (pagesize == 0) {
            return this.dataStroe.find(criteria);
        } else {
            return this.dataStroe.find(criteria).skip((page-1) * pagesize).limit(pagesize);
        }
    }

    protected getDBName(): string {
        return "todoItem";
    }

}

export default new TotoItemMapper();
