const o = (obj = {}) => {
    const self = {}
    self.obj = obj;
    self.merge = (obj1 = {}, obj2 = {}) => {
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
let a = {}
o(a).path('a.b.c', 123)
console.log("let a = {};o(a).path('a.b.c', 123) 空对象设置值:", JSON.stringify(a));
a = o(a).path('a.b.d', 123)
console.log("a = o(a).path('a.b.d', 123) 对象二次赋值:", JSON.stringify(a));
a = o(a).path('a.b.c', 1234)
console.log("a = o(a).path('a.b.c', 1234) 对象值修改:", JSON.stringify(a));
let a1 = o(a).path('a.b.c')
console.log("let a1 = o(a).path('a.b.c') 对象获取值方式1:", JSON.stringify(a1));
let a2 = o(a).path('a.b.c')
console.log("let a2 = o(a).path('a.b.c') 对象获取值方式2:", JSON.stringify(a2));
let a3 = o(a).path('a.b')
console.log("let a3 = o(a).path('a.b') 对象获取值方式3:", JSON.stringify(a3));
a = o(a).path('a.b.d', null)
console.log("a = o(a).path('a.b.d', null) 对象删除属性:", JSON.stringify(a));
a = o(a).path('a.b', null)
console.log("a = o(a).path('a.b', null) 对象删除属性:", JSON.stringify(a));
a = o(a).path('a.b.d1', {
    d1: 'd1'
})
console.log("a = o(a).path('a.b.d1', { d1: 'd1' }) 对象设置对象属性:", JSON.stringify(a));
a = o(a).path('a.b.d2', {
    d2: 'd2'
})
console.log("a = o(a).path('a.b.d2', { d2: 'd2' }) 对象设置对象属性:", JSON.stringify(a));
a = o(a).path('a.b.d', {
    d1: 'd1'
})
console.log("a = o(a).path('a.b.d', { d1: 'd1' }) 对象设置对象属性:", JSON.stringify(a));
a = o(a).path('a.b.d', {
    d2: 'd2'
})
console.log("a = o(a).path('a.b.d', { d2: 'd2' }) 对象设置对象属性:", JSON.stringify(a));
