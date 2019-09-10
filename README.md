# Object.val
Javascript中设置/获取/删除Object的值,支持路径.
```js
var a = { ab: { cd: 123 } };
//读取数据
console.log('get ("ab.cd"):', a.val('ab.cd')); //get
//设置值,如果路径重叠值将被覆盖
console.log('set ("ab.cd.ef.g.h", 321):', JSON.stringify(a.val('ab.cd.ef.g.h', 321))); //set
console.log('set ("ab.cd.ef.g.i", 456):', JSON.stringify(a.val('ab.cd.ef.g.i', 456))); //set
//读取设置后的值
console.log('get ("ab.cd.ef.g.h"):', a.val('ab.cd.ef.g.h')); //get
//删除路径中的某个值
console.log('del ("ab.cd.ef.g.h", null):', JSON.stringify(a.val('ab.cd.ef.g.h', null))); //del
//再次读取将返回undefined
console.log('get ("ab.cd.ef.g.h"):', a.val('ab.cd.ef.g.h')); //get
//输出变量
console.log('a object:', a);
```
