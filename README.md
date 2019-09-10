# Object.val
Javascript中设置/获取/删除Object的值,支持路径.
```js
var a = { ab: { cd: 123 } };
console.log('get ("ab.cd"):', a.val('ab.cd')); //get
console.log('set ("ab.cd.ef.g.h", 321):', JSON.stringify(a.val('ab.cd.ef.g.h', 321))); //set
console.log('set ("ab.cd.ef.g.i", 456):', JSON.stringify(a.val('ab.cd.ef.g.i', 456))); //set
console.log('get ("ab.cd.ef.g.h"):', a.val('ab.cd.ef.g.h')); //get
console.log('del ("ab.cd.ef.g.h", null):', JSON.stringify(a.val('ab.cd.ef.g.h', null))); //del
console.log('get ("ab.cd.ef.g.h"):', a.val('ab.cd.ef.g.h')); //get
console.log('a object:', a);
```
