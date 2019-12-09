/* jshint esversion: 6 */
// socket_send = set_socket('all_share_data', 'socket', function(msg) { console.log(msg); });
// socket_send('momoca',null,{})
const set_socket = function(namespace, socket_var, ok, err) {
    err = err || function(msg) {};
    if (!namespace) return;
    if (!socket_var) return;
    var cache = (key, value = undefined, time = 0) => {
            let res = {
                    key,
                    value,
                    time
                },
                _t = ((new Date()).getTime());
            time = parseInt(time);
            if (isNaN(time)) return error_log(res, 'time error');
            time = time * 1000;
            if (key === undefined) return error_log(res, 'key undefined');
            let storage = window.localStorage;
            if (key === null) return storage.clear();
            if (typeof(key) !== 'string') return error_log(res, 'key not string');
            if (storage === null) return error_log(res, 'Storage not create');
            if (value === null) {
                storage.removeItem(key);
            } else {
                if (value === undefined) {
                    value = null;
                    obj = storage.getItem(key);
                    if (obj) {
                        obj = JSON.parse(obj);
                        if ((obj.t === 0) || (obj.t > 0 && obj.t > _t)) {
                            value = obj.value;
                        }
                    }
                    return value;
                } else {
                    let t = (time == 0 ? 0 : _t + time);
                    storage.setItem(key, JSON.stringify({
                        t,
                        value
                    }));
                    return value;
                }
            }
        },
        o = function(obj) {
            var current = obj || {};
            return {
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
                        if (_path === null) {
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
    socket_var = namespace + '_' + socket_var;
    let host = "wss://api.v2.ctx.org.cn/mwss/" + namespace;
    if (window[socket_var]) window[socket_var].close();
    if (window[socket_var + 'Interval']) clearInterval(window[socket_var + 'Interval']);
    window[socket_var] = new WebSocket(host);
    window[socket_var].onopen = function(msg) {
        window[socket_var + 'Interval'] = setInterval(function() {
            window[socket_var].send('ping');
        }, 1000 * 60 * 20);
    };
    window[socket_var].onmessage = function(msg) {
        // {
        //     key:xxx
        //     lasttime:xxx
        //     data:
        // }
        if (msg.data === 'ping') return;
        let data = JSON.parse(decodeURIComponent(msg.data));
        let c_data = cache(data.key);
        if (!c_data) {
            //null
            cache(data.key, data);
            if (ok) ok(data);
            return;
        } else {
            //true
            if (c_data.lasttime <= data.lasttime) {
                tmp = data;
            } else {
                tmp = c_data;
            }
            cache(data.key, tmp);
            if (ok) ok(tmp);
            return;
        }
        return;
    };
    window[socket_var].onclose = err;
    return function(key, path, value) {
        let data = cache(key);
        data = data || {};
        data = o(data.data).path(path, value);
        let msg = {
            key: key,
            lasttime: (new Date()).getTime(),
            data: data,
        };
        window[socket_var].send(encodeURIComponent(JSON.stringify(msg)));
    };
};
