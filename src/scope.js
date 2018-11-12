//ES5中作用域
var callbacks = [];
for (var i = 0; i <= 2; i++) {
    callbacks[i] = function() {
        return i * 2;
    }
}

//看下执行结果
console.table([
    callbacks[0](),
    callbacks[1](),
    callbacks[2](),
])
//结果如下图所示

//为什么都是6呢 这里其实是因为i的变量提升导致i的作用域其实是全局的

//ES6中的作用域
const callbacks2 = []
for (let j = 0; j <= 2; j++) {
    callbacks2[j] = function() {
        return j * 2;
    }
}

//看下执行结果
console.table([
    callbacks2[0](),
    callbacks2[1](),
    callbacks2[2](),
]);
//结果如下图所示
//用let声明的变量有块级作用域 会将当前作用域下的j变量保存下来供后面的闭包使用
//每循环一次就生成一个新的作用域，下面的闭包中的变量每次跟循环中的变量保持一致

//块作用域
//举个例子 在ES5中想给代码做个隔离————立即执行函数
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
//结果为true
//原因是因为两个foo函数的作用域是不同的，作用域被立即执行函数隔离开

//在ES6中就非常简单了两个{}之间的作用域是独立的
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
//结果都是true 由此可见ES6中的作用域也更加简单利于理解