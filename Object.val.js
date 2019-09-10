Object.prototype.val = function(_path, _value) {
    if (typeof _path === 'string') {
        return this.val(_path.split('.'), _value);
    }
    var i,
        current = this;
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
            delete(current[_path[0]]);
            return current;
        }
        if (!current[_path[0]]) return current;
        this[_path[0]] = current[_path[0]].val(_path.slice(1), _value);
    } else {
        //set
        if (_path.length === 1) {
            current[_path[0]] = _value;
            return current;
        }
        if (!current[_path[0]] || !(current[_path[0]] instanceof Object)) current[_path[0]] = {};
        this[_path[0]] = current[_path[0]].val(_path.slice(1), _value);
    }
    return this;
};
