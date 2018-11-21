# ES6学习笔记（一）
## 对比学习方法
解决一个问题分别使用ES5、ES6方式实现

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
![Hexo](1.jpg)
为什么都是6呢 这里其实是因为i的变量提升导致作用域其实是全局的
用let声明的变量有块级作用域 会将当前作用域下的j变量保存下来供后面的闭包使用
每循环一次就生成一个新的作用域，下面的闭包中的变量每次跟循环中的变量保持一致

块作用域
举个例子 在ES5中想给代码做个隔离————立即执行函数
```
(function() {
    var foo = function() {
        return 1;
    }
    console.log('foo()===1', foo() === 1);
    (function() {
        var foo = function() {
            return 2
        }
        console.log('foo()===2', foo() === 2);
    })()
})()
```
结果为true
原因是因为两个foo函数的作用域是不同的，作用域被立即执行函数隔离开

在ES6中就非常简单了两个{}之间的作用域是独立的
```
{
    function foo() {
        return 1;
    }
    console.log("foo()===1", foo() === 1) 
    {
        function foo() {
            return 2;
        }
        console.log("foo()===2", foo() === 2);
    }
    console.log("foo()===1", foo() === 1);
}
```
结果都是true 由此可见ES6中的作用域也更加简单利于理解

### **箭头函数**
ES6中函数的新的语法

ES5中：
```
function a() {

    }
```

ES6中：
```
()=>{
    
    }
```
这里要注意两点：
* 箭头函数中的小括号是用来声明参数的，当参数只有一个时可以省略小括号；
* 花括号中的表达式直接作为返回值时，花括号也可以被省略；
例如：
```
// ES5中
{
    var evens = [1,2,3,4,5];
    var odds = evens.map(function(v) {
        return v + 1;
    })
    console.log(evens,odds);
}
```
```
// ES6中
{
    let evens = [1,2,3,4,5];
    let odds = evens.map(v => v + 1);
    console.log(evens, odds);
}
```
ES5中的函数写法和ES6中的函数写法久经区别在哪里，答案就是关于this的绑定
```
//ES5中的写法
{
    var factory = function() {
        this.a = 'a';
        this.b = 'b';
        this.c = {
            a: 'a+',
            b: function() {
                return this.a
            }
        }
    }
    console.log(new factory().c.b());
};
```
输出结果是什么呢?答案是'a+'。
总结了一句话：this的指向是该函数被调用的对象
```
//ES6中的写法
{
    let factory = function() {
        this.a = 'a';
        this.b = 'b';
        this.c = {
            a: 'a+',
            b: ()=>{
                return this.a
            }
        }
    }
    console.log(new factory().c.b());
};
```
输出结果是'a'。为什么产生这样的差异呢？原因在于箭头函数函数体中的this的指向是定义时this的指向

### **默认参数**
ES5中默认参数写法
```
function f(x,y,z) {
        if (y===undefined) {
            y=7;
        }
        if (z===undefined) {
            z=42;
        }
        return x+y+z;
    }
    console.log(f(1)) //结果是50
    console.log(f(1,3))  //结果是46
```
在ES5中默认参数在代码中没有赋值并且没有做参数校验的话代码是会出现问题的

ES6中默认参数写法
```
function f(x,y=7,z=42) {
        return x+y+z;
    }
    console.log(f(1)) //结果是50
    console.log(f(1,3))  //结果是46
```
ES6提供了简洁的默认值设置方式

#### 函数必选参数校验方式
在ES5中只能采取判断参数是否等于undefined来判断
在ES6中可以采用传入一个校验函数的方式来判断
```
    function checkParameter() {
        throw new Error('can\'t be empty')
    }
    function f(x=checkParameter(), y=7, z=42) {
        return x+y+z;
    }
    console.log(f(1)); //结果50
    try {
        f()
    } catch (e) {
        console.log(e) //结果抛出异常Error: can't be empty
    }
```
#### 可变参数
ES5可变参数使用arguments表示当前参数列表
```
function f() {
        var a=Array.prototype.slice.call(arguments);
        var sum = 0;
        a.forEach(function(item){
            sum+=item*1;
        })
        return sum;
    }
    console.log(f(1,2,3,6)); //结果是12
```
ES6中 使用扩展运算符```...```
```
function f(...a) {
        let sum=0;
        a.forEach(item=>{
            sum+=item*1
        });
        return sum
    }
    console.log(f(1,2,3,6)); //结果也是12
```
是不是感觉到ES6的强大了

#### 数组合并
ES5合并数组
```
var params = ['hello', true, 7];
    var other = [1,2].concat(params);
    console.log(other);//结果是[1, 2, "hello", true, 7]
```
ES6中合并数组
```
let params = ['hello', true, 7];
    let other = [1,2, ...params];
    console.log(other);//结果是[1, 2, "hello", true, 7]
```
写法非常简洁

### **对象代理**
写ES6中的对象代理之前先对ES6之前如何实现对象私有属性的方法做下介绍
ES5中的数据保护
```
var Person=function(){
        var data={
            name:'es5',
            sex:'male',
            age:15
        }
        this.get=function(key) {
            return data[key]
        }
        this.set=function(key, value) {
            if (key!='sex') {
                data[key]=value;
            }
        }
    }
    //声明一个实例
    var person = new Person();
    //读取数据
    console.table({
        name: person.get('name'),
        sex: person.get('sex'),
        age: person.get('age')
    })
    //修改数据
    person.set('name', 'es3-cname');
    console.table({
        name: person.get('name'),
        sex: person.get('sex'),
        age: person.get('age')
    })
    //尝试修改性别
    person.set('sex', 'female');
    console.table({
        name: person.get('name'),
        sex: person.get('sex'),
        age: person.get('age')
    })
```
结果如下

(index) | Value
------------- | -------------
name  | "es5"
sex  | "male"
age  | 15

(index) | Value
------------- | -------------
name  | "es3-cname"
sex  | "male"
age  | 15

(index) | Value
------------- | -------------
name  | "es3-cname"
sex  | "male"
age  | 15

ES5中可以使用这种方法实现数据保护但是偏向更老的ES3
ES5中的常量也可以实现
```
var Person={
        name: 'es5',
        age: 15
    };
    Object.defineProperty(Person, 'sex', {
        writable: false,
        value:'male'
    });
    console.table({
        name: Person.name,
        age: Person.age,
        sex: Person.sex
    })
    Person.name='es5-cname';
    console.table({
        name: Person.name,
        age: Person.age,
        sex: Person.sex
    })
    try {
        Person.sex='female';
        console.table({
            name: Person.name,
            age: Person.age,
            sex: Person.sex
        })
    } catch (e){
        console.log(e)
    } finally {

    }
    //结果报错Uncaught TypeError: Cannot assign to read only property 'sex' of object '#<Object>'
```
结果如下

(index) | Value
------------- | -------------
name  | "es5"
sex  | "male"
age  | 15

(index) | Value
------------- | -------------
name  | "es5-cname"
sex  | "male"
age  | 15

第三个打印报错语句
```
Uncaught TypeError: Cannot assign to read only property 'sex' of object '#<Object>'
```
ES6中的做法
```
let Person={
        name: 'es6',
        sex: 'male',
        age: 15
    };
    let person = new Proxy(Person, {
        get(target, key){
            return target[key]
        },
        set(targt, key, value){
            if (key!=='sex') {
                target[key]=value;
            }
        }
    });
    console.table({
        name: person.name,
        sex: person.sex,
        age: person.age
    })
    try {
        person.sex='female';
        console.table({
            name: person.name,
            age: person.age,
            sex: person.sex
        })
    } catch (e){
        console.log(e)
    } finally {

    }
    //报错'set' on proxy: trap returned falsish for property 'sex'
```
结果如下

(index) | Value
------------- | -------------
name  | "es6"
sex  | "male"
age  | 15

第二个打印报错语句
```
'set' on proxy: trap returned falsish for property 'sex'
```
对象代理实质上就是生成一个代理对象，用户操作的实际上是代理对象而不是原来的对象
将来所有的限制都可以放在代理对象中去操作，跟业务进行隔离
## **未完待续**
初步接触ES6之后，有时会觉得这是一门新的语言，但是回过头来又觉得实在ES5的基础上一个质的飞跃
写法十分优雅，语法糖甚多，给开发者提供了更多便利，后续会继续学习ES6的更多内容
* 解构赋值
* 模板字符串
* 正则扩展
* 数字扩展
* 迭代器Iterator
* Generator
* Set和Map
* 函数扩展
* Class
* Module
* symbol
* 对象扩展......