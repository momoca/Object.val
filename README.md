# Object.val
Javascript中设置/获取/删除Object的值,支持路径.
```js
var a = { ab: { cd: 123 } };
//a = o().path(null,{ ab: { cd: 123 }})
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
## path.js
```js
let a = path('a.b.c', 123);
console.log("let a = path('a.b.c', 123) 空对象设置值:", JSON.stringify(a));
a = path('a.b.d', 123, a);
console.log("a = path('a.b.d', 123, a) 对象二次赋值:", JSON.stringify(a));
a = path('a.b.c', 1234, a);
console.log("a = path('a.b.c', 1234, a) 对象值修改:", JSON.stringify(a));
let a1 = path(a, 'a.b.c');
console.log("let a1 = path(a, 'a.b.c') 对象获取值方式1:", JSON.stringify(a1));
let a2 = path('a.b.c', a);
console.log("let a2 = path('a.b.c', a) 对象获取值方式2:", JSON.stringify(a2));
let a3 = path('a.b', a);
console.log("let a3 = path('a.b.c', a) 对象获取值方式3:", JSON.stringify(a3));
a = path('a.b.d', null, a);
console.log("a = path('a.b.d', null, a) 对象删除属性:", JSON.stringify(a));
a = path('a.b', null, a);
console.log("a = path('a.b', null, a) 对象删除属性:", JSON.stringify(a));
a = path('a.b.d', { d1: 'd1' }, a);
console.log("a = path('a.b.d', { d1: 'd1' }, a) 对象设置对象属性:", JSON.stringify(a));
```
