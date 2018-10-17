# ES6学习笔记
## 对比学习方法
解决一个问题分别使用ES3、ES5、ES6方式实现

### **常量**
ES5中的常量的写法 利用给对象增加属性的方法,JS中全局对象是window，对于常量来说可以绑定在window上
```
Object.defineProperty(window,"PI2", {
	value: 3.1415926,
	writable: false, //只读
}) 


console.log(window.PI2);

// ES6中常量的写法
const PI = 3.1415926;
console.log(PI);
```
### **作用域**

ES5中作用域
```
var callbacks = [];
for (var i = 0; i <= 2; i++) {
    callbacks[i] = function() {
        return i * 2;
    }
}
```
看下执行结果
```
console.table([
    callbacks[0](),
    callbacks[1](),
    callbacks[2](),
])
```
结果如下图所示
![1](assets/1.jpg)
为什么都是6呢 这里其实是因为i的变量提升导致i的作用域其实是全局的
