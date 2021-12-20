const path = (objPath, value, obj) => {
    //整理数据开始
    if (objPath?.constructor === Object && value?.constructor === String && obj === undefined) {
        // obj path
        obj = objPath;
        objPath = value;
        value = undefined;
    } else if (objPath?.constructor === String && value?.constructor === Object && obj === undefined) {
        // path obj
        obj = value;
        value = undefined;
    }
    //整理数据结束
    if (!obj) obj = {};
    if (objPath.constructor === String) {
        return path(objPath.split('.'), value, obj);
    }
    if (value === undefined) {
        //get
        let current = obj;
        for (let i = 0; i < objPath.length; ++i) {
            if (current[objPath[i]] === undefined) {
                return undefined;
            } else {
                current = current[objPath[i]];
            }
        }
        return current;
    } else if (value === null) {
        //del
        if (objPath.length === 1) {
            delete obj[objPath[0]];
            return obj;
        }
        if (!obj[objPath[0]]) return obj;
        obj[objPath[0]] = path(objPath.slice(1), value, obj[objPath[0]]);
    } else {
        //set
        if (objPath === null) {
            return value;
        }
        if (objPath.length === 1) {
            obj[objPath[0]] = value;
            return obj;
        }
        if (!obj[objPath[0]] || !(obj[objPath[0]] instanceof Object)) obj[objPath[0]] = {};
        obj[objPath[0]] = path(objPath.slice(1), value, obj[objPath[0]]);
    }
    return obj;
};
