
const o = function(obj) {
    var current = obj || {};
    return {
        merge: function(obj1, obj2) {
            if (obj1.constructor !== Object && obj2.constructor !== Object) return obj2;
            for (var p in obj2) {
                try {
                    if (obj1[p].constructor == Object && obj2[p].constructor == Object) {
                        obj1[p] = this.merge(obj1[p], obj2[p]);
                    } else {
                        obj1[p] = obj2[p];
                    }
                } catch (e) {
                    obj1[p] = obj2[p];
                }
            }
            return obj1;
        },
        path: function(_path, _value, _obj) {
            var i;
            if (!_obj) {
                _obj = current;
            }
            if (typeof _path === 'string') {
                return this.path(_path.split('.'), _value);
            }
            if (_value === undefined) {
                //get
                for (i = 0; i < _path.length; ++i) {
                    if (current[_path[i]] === undefined) {
                        return undefined;
                    } else {
                        current = current[_path[i]];
                    }
                }
                return current;
            } else if (_value === null) {
                //del
                if (_path.length === 1) {
                    delete(_obj[_path[0]]);
                    return _obj;
                }
                if (!_obj[_path[0]]) return _obj;
                _obj[_path[0]] = this.path(_path.slice(1), _value, _obj[_path[0]]);
            } else {
                //set
                if(_path===null){
                    return _value;
                }
                if (_path.length === 1) {
                    _obj[_path[0]] = _value;
                    return _obj;
                }
                if (!_obj[_path[0]] || !(_obj[_path[0]] instanceof Object)) _obj[_path[0]] = {};
                _obj[_path[0]] = this.path(_path.slice(1), _value, _obj[_path[0]]);
            }
            return _obj;
        }
    };
};
