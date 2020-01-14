import { Criteria, CriteriaType } from './Criteria';

class NeDBExample {

    private allCriteriaList: Criteria[] = [];

    public createCrteria(): Criteria {
        let criteria = new Criteria();
        this.allCriteriaList.push(criteria);
        return criteria;
    }

    public or(): Criteria {
        return this.createCrteria();
    }

    public getCriteria(): CriteriaType {
        let param: CriteriaType = {};

        if (this.allCriteriaList.length > 0) {
            if (this.allCriteriaList.length > 1) {
                // or 条件
                let orCriterias: CriteriaType[] = [];
                for (let criteria of this.allCriteriaList) {
                    let criterias = criteria.criterias;
                    if (criterias.length > 1) {
                        let andParam: CriteriaType = {
                            $and: criterias
                        };
                        orCriterias.push(andParam);
                    } else {
                        orCriterias.push(criterias[0])
                    }
                }
                return { $or: orCriterias};
            } else {
                // 非or
                let criteria = this.allCriteriaList[0];
                if (criteria.criterias.length > 1) {
                    return {
                        $and: criteria.criterias
                    }
                } else {
                    return criteria.criterias[0];
                }
            }
        }
        return param;
    }
}
export {NeDBExample};
