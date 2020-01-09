interface CriteriaType {
    [propName: string]: any
}

class Criteria {

    private andCriteriaList: CriteriaType[] = [];

    get criterias(): CriteriaType[] {
        return this.andCriteriaList;
    }

    eq(field: string, value: any): Criteria {
        let criteriaParam: CriteriaType = {
            [field]: value
        };

        this.andCriteriaList.push(criteriaParam);
        return this;
    };

    ne(field: string, value: any): Criteria {
        let criteriaParam: CriteriaType =  {
            [field]: {$ne: value}
        };
        this.andCriteriaList.push(criteriaParam);
        return this;
    }

    lt(field: string, value: any): Criteria {
        let criteriaParam: CriteriaType = {
            [field]: {$lt: value}
        };
        this.andCriteriaList.push(criteriaParam);
        return this;
    };

    lte(field: string, value: any): Criteria {
        let criteriaParam: CriteriaType = {
            [field]: {$lte: value}
        };
        this.andCriteriaList.push(criteriaParam);
        return this;
    };

    gt(field: string, value: any): Criteria {
        let criteriaParam: CriteriaType = {
            [field]: {$gt: value}
        };
        this.andCriteriaList.push(criteriaParam);
        return this;
    };

    gte(field: string, value: any): Criteria {
        let criteriaParam: CriteriaType = {
            [field]: {$gte: value}
        };
        this.andCriteriaList.push(criteriaParam);
        return this;
    };

    in(field: string, values: any[]): Criteria {
        let criteriaParam: CriteriaType = {
            [field]: {$in: values}
        };
        this.andCriteriaList.push(criteriaParam);
        return this;
    };

    nin(field: string, values: any[]): Criteria {
        let criteriaParam: CriteriaType = {
            [field]: {$nin: values}
        };
        this.andCriteriaList.push(criteriaParam);
        return this;
    }
}

export default class NeDBExample {

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
