const o = (obj = {}) => {
    const self = {}
    self.obj = obj;
    self.merge = (obj1, obj2) => {
        if (obj1.constructor !== Object && obj2.constructor !== Object) return obj2;
        for (let p in obj2) {
            try {
                if (obj1[p].constructor == Object && obj2[p].constructor == Object) {
                    obj1[p] = self.merge(obj1[p], obj2[p]);
                } else if (obj1[p].constructor == Object && obj2[p].constructor == Array) {
                    if (obj2[p].length === 0) {
                        obj2[p] = {}
                    }
                    obj1[p] = self.merge(obj1[p], obj2[p]);
                } else {
                    obj1[p] = obj2[p];
                }
            } catch (e) {
                obj1[p] = obj2[p];
            }
        }
        return obj1;
    }
    self.path = function(objPath, objValue, obj) {
        if (!obj) obj = self.obj;
        if (objPath.constructor === String) {
            return self.path.apply(self, [objPath.split('.'), objValue, obj]);
        }
        if (objValue === undefined) {
            //get
            for (let i = 0; i < objPath.length; ++i) {
                if (obj[objPath[i]] === undefined) {
                    return undefined;
                } else {
                    obj = obj[objPath[i]];
                }
            }
            return obj;
        } else if (objValue === null) {
            //del
            let key = objPath[0];
            if (objPath.length === 1) {
                delete obj[key];
                return obj;
            }
            if (!obj[key]) return obj;
            obj[key] = self.path.apply(self, [objPath.slice(1), objValue, obj[key]]);
        } else {
            //set
            let key = objPath[0];
            if (objPath === null) {
                return objValue;
            }
            if (objPath.length === 1) {
                if (objValue instanceof Object) {
                    obj[key] = self.merge(obj[key], objValue)
                } else {
                    obj[key] = objValue;
                }
                return obj;
            }
            if (!obj[key] || !(obj[key] instanceof Object)) obj[key] = {};
            obj[key] = self.path.apply(self, [objPath.slice(1), objValue, obj[key]]);
        }
        return obj;
    }
    return self
}
