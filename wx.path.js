const o = (obj = {}) => {
    const self = {}
    self.obj = obj;
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
            if (objPath.length === 1) {
                delete obj[objPath[0]];
                return obj;
            }
            if (!obj[objPath[0]]) return obj;
            obj[objPath[0]] = self.path.apply(self, [objPath.slice(1), objValue, obj[objPath[0]]]);
        } else {
            //set
            if (objPath === null) {
                return objValue;
            }
            if (objPath.length === 1) {
                obj[objPath[0]] = objValue;
                return obj;
            }
            if (!obj[objPath[0]] || !(obj[objPath[0]] instanceof Object)) obj[objPath[0]] = {};
            obj[objPath[0]] = self.path.apply(self, [objPath.slice(1), objValue, obj[objPath[0]]]);
        }
        return obj;
    }
    return self
}
